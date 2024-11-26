import { promises as fs } from 'fs';
import path from 'path';
import type { Product, ProductVariants, Specification, DimensionType } from '../types/catalog';
import { extractFromPDF } from '../utils/pdfExtractor';

interface Dimensions {
  diameter: string;
  lengthOfCut: string;
  shankDiameter: string;
  overallLength: string;
}

type CurrentProduct = Partial<Omit<Product, 'specifications'>> & {
  specifications?: Partial<Specification>;
};

function fractionToDecimal(fraction: string): string {
  if (!fraction.includes('/')) {
    if (fraction.includes('-')) {
      // Handle mixed numbers like "1-1/2"
      const [whole, frac] = fraction.split('-');
      const [num, den] = frac.split('/');
      return (parseInt(whole) + parseInt(num) / parseInt(den)).toFixed(3);
    }
    return fraction;
  }
  const [numerator, denominator] = fraction.split('/').map(Number);
  return (numerator / denominator).toFixed(3);
}

function cleanText(text: string): string[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

function parseDimensions(line: string): Dimensions | null {
  const parts = line.split(/\s+/);
  
  // Need at least 4 dimensions (OD, LOC, SHK, OAL)
  if (parts.length < 4) return null;
  
  // Extract and convert dimensions
  const dimensions = {
    diameter: fractionToDecimal(parts[0]),
    lengthOfCut: fractionToDecimal(parts[1]),
    shankDiameter: fractionToDecimal(parts[2]),
    overallLength: fractionToDecimal(parts[3])
  };

  // Validate dimensions
  if (Object.values(dimensions).some(d => isNaN(parseFloat(d)))) {
    return null;
  }

  return dimensions;
}

function parsePartNumbers(parts: string[]): Partial<ProductVariants> {
  const variants: Partial<ProductVariants> = {};
  
  // Start from index 4 to skip dimensions
  if (parts.length > 4) {
    // Map column positions to variant types
    const variantMap: { [key: number]: keyof ProductVariants }[] = [
      { 4: 'twoFlute' },
      { 5: 'threeFlute' },
      { 6: 'fourFlute' },
      { 7: 'twoFlutePowerA' },
      { 8: 'threeFlutePowerA' },
      { 9: 'fourFlutePowerA' }
    ];

    variantMap.forEach((map, i) => {
      const position = 4 + i;
      const key = Object.values(map)[0];
      if (parts[position] && parts[position].match(/^[0-9]{3}-[0-9]{3}(-[1-8])?$/)) {
        variants[key] = parts[position];
      }
    });
  }

  return variants;
}

function isValidProduct(product: CurrentProduct): boolean {
  if (!product.id || !product.specifications) {
    return false;
  }

  const specs = product.specifications;
  return !!(
    specs.diameter &&
    specs.lengthOfCut &&
    specs.shankDiameter &&
    specs.overallLength
  );
}

async function processPDF(inputPath: string): Promise<Product[]> {
  try {
    console.log('Reading PDF file...');
    
    const { text } = await extractFromPDF(inputPath);
    await fs.writeFile('pdf_debug.txt', text);
    console.log('Saved raw PDF text to pdf_debug.txt');
    
    const lines = cleanText(text);
    const products: Product[] = [];
    const processedPartNumbers = new Set<string>();
    
    let inFractionalSection = false;
    
    for (const line of lines) {
      // Check for section markers
      if (line.toLowerCase().includes('fractional square endmills')) {
        inFractionalSection = true;
        continue;
      }
      
      if (inFractionalSection) {
        const parts = line.split(/\s+/).filter(Boolean);
        if (parts.length < 4) continue;

        const dimensions = parseDimensions(line);
        if (!dimensions) continue;

        const variants = parsePartNumbers(parts);
        if (Object.keys(variants).length === 0) continue;

        // Get base part number
        const basePartNumber = variants.twoFlute || variants.threeFlute || variants.fourFlute || 
                              variants.twoFlutePowerA || variants.threeFlutePowerA || variants.fourFlutePowerA;
        
        if (basePartNumber && !processedPartNumbers.has(basePartNumber)) {
          processedPartNumbers.add(basePartNumber);
          
          const specs: Specification = {
            ...dimensions,
            partNumber: basePartNumber,
            dimensionType: 'fractional' as DimensionType
          };

          const product: Product = {
            id: basePartNumber,
            sku: basePartNumber,
            name: 'Fractional Square Endmill',
            category: 'standard-endmills',
            subcategory: 'square-endmills',
            subType: 'fractional-square',
            description: 'Standard fractional square end mill for general purpose milling operations',
            image: '/src/components/images/products/endmill.png',
            specifications: specs,
            variants: variants
          };

          // Determine if it's an extra-long endmill
          const loc = parseFloat(dimensions.lengthOfCut);
          const od = parseFloat(dimensions.diameter);
          if (loc / od >= 4) {
            product.subType = 'extra-long-square';
            product.specifications.dimensionType = 'extra-long';
          }

          if (isValidProduct(product)) {
            products.push(product);
            console.log('Added product:', {
              id: basePartNumber,
              dimensions: dimensions
            });
          }
        }
      }
    }

    console.log(`\nFound ${products.length} total fractional mill products`);
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
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
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

main().catch(console.error);
