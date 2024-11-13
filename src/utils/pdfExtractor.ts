import { promises as fs } from 'fs';
import pdftk from 'node-pdftk';
import pdfParse from 'pdf-parse';
import { Product, ProductSpecification } from '../types/catalog';

interface ExtractedData {
  text: string;
  images: Buffer[];
}

export async function extractFromPDF(pdfPath: string): Promise<ExtractedData> {
  // Read PDF file
  const dataBuffer = await fs.readFile(pdfPath);
  
  // Extract text using pdf-parse
  const data = await pdfParse(dataBuffer);
  
  // Extract images using node-pdftk
  const pdfDoc = pdftk.input(pdfPath);
  const images = await pdfDoc.burst('output_%d.png');
  
  // Read extracted images into buffers
  const imageBuffers = await Promise.all(
    images.map(imagePath => fs.readFile(imagePath))
  );
  
  // Clean up temporary image files
  await Promise.all(
    images.map(imagePath => fs.unlink(imagePath))
  );
  
  return {
    text: data.text,
    images: imageBuffers
  };
}

// Parse text into structured data
export function parseProductData(text: string): Product[] {
  const products: Product[] = [];
  const lines = text.split('\n');
  
  let currentProduct: Partial<Product> = {};
  
  for (const line of lines) {
    // Example parsing logic - adjust based on actual PDF structure
    if (line.includes('OD')) {
      // Parse dimensions
      const dimensions = parseDimensions(line);
      if (dimensions) {
        currentProduct.specifications = dimensions;
      }
    } else if (line.includes('Part Number')) {
      // Parse part numbers
      const partNumbers = parsePartNumbers(line);
      if (partNumbers) {
        currentProduct.variants = partNumbers;
      }
    }
    
    // When we have a complete product, add it to the array
    if (isCompleteProduct(currentProduct)) {
      products.push(currentProduct as Product);
      currentProduct = {};
    }
  }
  
  return products;
}

function parseDimensions(line: string): ProductSpecification | null {
  // Example dimension parsing logic
  const match = line.match(/OD\s*(\d+(?:\/\d+)?)\s*LOC\s*(\d+(?:\/\d+)?)\s*SHK\s*(\d+(?:\/\d+)?)\s*OAL\s*(\d+(?:\/\d+)?)/);
  if (match) {
    const [, od, loc, shk, oal] = match;
    return {
      diameter: od,
      lengthOfCut: loc,
      shankDiameter: shk,
      overallLength: oal,
      partNumber: '', // Will be filled in later
    };
  }
  return null;
}

function parsePartNumbers(line: string): Record<string, string> | null {
  // Example part number parsing logic
  const partNumbers: Record<string, string> = {};
  const matches = line.matchAll(/(\d{3}-\d{3}(?:-\d)?)/g);
  
  for (const match of matches) {
    const partNumber = match[1];
    if (partNumber.endsWith('-1')) {
      partNumbers.powerA = partNumber;
    } else {
      partNumbers.uncoated = partNumber;
    }
  }
  
  return Object.keys(partNumbers).length > 0 ? partNumbers : null;
}

function isCompleteProduct(product: Partial<Product>): boolean {
  return !!(
    product.specifications?.diameter &&
    product.specifications?.lengthOfCut &&
    product.specifications?.shankDiameter &&
    product.specifications?.overallLength &&
    product.specifications?.partNumber
  );
}

// Main function to process PDF and create database
export async function createDatabaseFromPDF(pdfPath: string): Promise<Product[]> {
  try {
    const { text, images } = await extractFromPDF(pdfPath);
    const products = parseProductData(text);
    
    // Associate images with products if needed
    // This will depend on how images are organized in your PDF
    
    return products;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}
