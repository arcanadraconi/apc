import { promises as fs } from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import type { Product } from '../types/catalog';
import { extractFromPDF } from '../utils/pdfExtractor';

function cleanText(text: string): string[] {
  // Add spaces between camelCase/compressed words
  const spaced = text.replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/(\d)([A-Za-z])/g, '$1 $2')
                    .replace(/([A-Za-z])(\d)/g, '$1 $2');
  
  // Split into lines and clean
  return spaced
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      // Clean up common OCR artifacts
      return line
        .replace(/\s+/g, ' ')
        .replace(/[""]/g, '"')
        .trim();
    });
}

function findTableStart(lines: string[]): number {
  // Look for table headers or dimension patterns
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toUpperCase();
    if (
      line.includes('OD') && 
      line.includes('LOC') && 
      line.includes('SHK') && 
      line.includes('OAL')
    ) {
      console.log('Found table header at line', i, ':', lines[i]);
      return i;
    }
  }
  return -1;
}

function parseDimensions(line: string): any {
  // Remove any non-dimension text
  const cleaned = line.replace(/[^\d\s\/\.-]/g, ' ').trim();
  
  // Look for 4 dimensions (OD, LOC, SHK, OAL)
  const parts = cleaned.split(/\s+/);
  
  if (parts.length >= 4) {
    const dims = parts.slice(0, 4);
    console.log('Found dimensions:', dims);
    
    // Validate each dimension is a fraction or decimal
    const validDims = dims.every(d => 
      /^\d+\/\d+$/.test(d) || 
      /^\d*\.\d+$/.test(d) || 
      /^\d+(?:-\d+\/\d+)?$/.test(d)
    );
    
    if (validDims) {
      return {
        diameter: dims[0],
        lengthOfCut: dims[1],
        shankDiameter: dims[2],
        overallLength: dims[3]
      };
    }
  }
  return null;
}

function parsePartNumber(line: string): string | null {
  // Look for part number patterns
  const match = line.match(/(\d{3}-\d{3}(?:-\d)?)/);
  if (match) {
    console.log('Found part number:', match[1]);
    return match[1];
  }
  return null;
}

function isValidProduct(product: Partial<Product>): boolean {
  if (!product.id || !product.specifications) {
    return false;
  }

  const specs = product.specifications;
  const hasValidDims = !!(
    specs.diameter &&
    specs.lengthOfCut &&
    specs.shankDiameter &&
    specs.overallLength
  );

  if (!hasValidDims) {
    console.log('Invalid product:', {
      id: product.id,
      specs: product.specifications
    });
  }

  return hasValidDims;
}

async function processPDF(inputPath: string): Promise<Product[]> {
  try {
    console.log('Reading PDF file...');
    
    // Extract both text and images
    console.log('Extracting content from PDF...');
    const { text, images } = await extractFromPDF(inputPath);
    
    // Create images directory if it doesn't exist
    const imagesDir = path.join(process.cwd(), 'src/assets/catalog-images');
    await fs.mkdir(imagesDir, { recursive: true });
    
    // Save images
    console.log('Saving extracted images...');
    const imageFiles = await Promise.all(
      images.map(async (imageBuffer, index) => {
        const filename = `category-${index + 1}.png`;
        const imagePath = path.join(imagesDir, filename);
        await fs.writeFile(imagePath, imageBuffer);
        return `/src/assets/catalog-images/${filename}`;
      })
    );
    
    // Save raw text for debugging
    await fs.writeFile('pdf_debug.txt', text);
    console.log('Saved raw PDF text to pdf_debug.txt');
    
    console.log('Processing extracted text...');
    const lines = cleanText(text);
    const products: Product[] = [];
    const processedPartNumbers = new Set<string>();
    
    console.log('\nFirst 20 lines of cleaned text:');
    lines.slice(0, 20).forEach((line, i) => {
      console.log(`Line ${i + 1}: "${line}"`);
    });

    // Find the start of the product tables
    const tableStart = findTableStart(lines);
    if (tableStart === -1) {
      console.log('No product table found');
      return products;
    }

    let currentProduct: Partial<Product> = {};
    
    for (let i = tableStart; i < lines.length; i++) {
      const line = lines[i];
      
      // Log progress every 1000 lines
      if (i % 1000 === 0) {
        console.log(`Processing line ${i} of ${lines.length}`);
      }

      // Look for part numbers
      const partNumber = parsePartNumber(line);
      if (partNumber && !processedPartNumbers.has(partNumber)) {
        // If we have a valid current product, save it
        if (isValidProduct(currentProduct)) {
          products.push(currentProduct as Product);
        }

        processedPartNumbers.add(partNumber);
        currentProduct = {
          id: partNumber,
          sku: partNumber,
          name: 'Fractional Square Endmill',
          category: 'Endmills',
          subcategory: 'Fractional',
          description: '',
          image: '',
          specifications: {
            partNumber,
            diameter: '',
            lengthOfCut: '',
            shankDiameter: '',
            overallLength: ''
          },
          variants: {}
        };

        // Look for dimensions in next few lines
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          const dims = parseDimensions(lines[j]);
          if (dims) {
            currentProduct.specifications = {
              ...dims,
              partNumber
            };
            break;
          }
        }
      }
    }

    // Don't forget the last product
    if (isValidProduct(currentProduct)) {
      products.push(currentProduct as Product);
    }

    console.log(`\nFound ${products.length} total products`);
    
    // Save image paths for reference
    await fs.writeFile(
      path.join(process.cwd(), 'src/data/catalog-images.json'),
      JSON.stringify(imageFiles, null, 2)
    );
    
    return products;

  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}

async function main(): Promise<void> {
  const inputPath = path.join(process.cwd(), 'catalog.pdf');
  const outputPath = path.join(process.cwd(), 'src/data/processed_catalog.json');
  
  try {
    console.log('Starting PDF processing...');
    const products = await processPDF(inputPath);
    
    // Create data directory if it doesn't exist
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Save processed data
    await fs.writeFile(
      outputPath,
      JSON.stringify(products, null, 2)
    );
    
    console.log(`Processing complete. ${products.length} products extracted.`);
    console.log(`Results saved to ${outputPath}`);
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
