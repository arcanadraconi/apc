const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Define types inline
type DimensionType = 'metric' | 'fractional' | 'extra-long';

interface CSVRow {
  OD: string;
  LOC: string;
  SHK?: string;
  OAL: string;
  Radius?: string;
  'Taper Angle'?: string;
  'Neck Length'?: string;
  '2-Flute'?: string;
  '3-Flute'?: string;
  '4-Flute'?: string;
  '6-Flute'?: string;
  '2-F Power A'?: string;
  '3-F Power A'?: string;
  '4-F Power A'?: string;
  '6-F Power A'?: string;
  [key: string]: string | undefined;
}

interface ProductSpecification {
  diameter: string;
  lengthOfCut: string;
  shankDiameter: string;
  overallLength: string;
  radius?: string;
  taperAngle?: string;
  neckLength?: string;
  dimensionType: DimensionType;
  coating: string;
  partNumber: string;
}

interface ProductVariants {
  twoFlute?: string;
  threeFlute?: string;
  fourFlute?: string;
  sixFlute?: string;
  twoFlutePowerA?: string;
  threeFlutePowerA?: string;
  fourFlutePowerA?: string;
  sixFlutePowerA?: string;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  specifications: ProductSpecification;
  variants: ProductVariants;
}

// CSV format configurations for different endmill types
const csvFormats: { [key: string]: string[] } = {
  'square-endmills': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '3-Flute', '4-Flute', '2-F Power A', '3-F Power A', '4-F Power A'],
  'ball-endmills': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute', '2-F Power A', '4-F Power A'],
  'corner-radius': ['OD', 'LOC', 'SHK', 'OAL', 'Radius', '2-Flute', '4-Flute', '2-F Power A', '4-F Power A'],
  '6-flute': ['OD', 'LOC', 'SHK', 'OAL', '6-Flute', '6-F Power A'],
  'double-end-square': ['OD', 'LOC', 'OAL', '2-Flute', '4-Flute'],
  'double-end-ball': ['OD', 'LOC', 'OAL', '2-Flute', '4-Flute'],
  'square-double-flat': ['OD', 'LOC', 'OAL', '2-Flute', '4-Flute'],
  'ball-double-flat': ['OD', 'LOC', 'OAL', '2-Flute', '4-Flute'],
  'drillmills': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '3-Flute'],
  'straight-flute-square': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
  'straight-flute-ball': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
  'mini-square': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
  'mini-ball': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
  'taper-square': ['OD', 'LOC', 'SHK', 'OAL', 'Taper Angle', '2-Flute', '4-Flute'],
  'taper-ball': ['OD', 'LOC', 'SHK', 'OAL', 'Taper Angle', '2-Flute', '4-Flute'],
  'short-flute': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
  'short-flute-necked': ['OD', 'LOC', 'SHK', 'OAL', 'Neck Length', '2-Flute', '4-Flute'],
  'short-flute-reduced': ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute']
};

// Helper function to read and parse CSV
function readCSV(filePath: string): CSVRow[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
}

// Helper function to determine product type from filename
function getProductType(filename: string): string {
  filename = filename.toLowerCase();
  if (filename.includes('square') && !filename.includes('double') && !filename.includes('mini') && !filename.includes('taper')) return 'square-endmills';
  if (filename.includes('ball') && !filename.includes('double') && !filename.includes('mini') && !filename.includes('taper')) return 'ball-endmills';
  if (filename.includes('corner radius')) return 'corner-radius';
  if (filename.includes('6 flute')) return '6-flute';
  if (filename.includes('square') && filename.includes('double end')) return 'double-end-square';
  if (filename.includes('ball') && filename.includes('double end')) return 'double-end-ball';
  if (filename.includes('sq dbl') && filename.includes('flat')) return 'square-double-flat';
  if (filename.includes('ball') && filename.includes('double') && filename.includes('flat')) return 'ball-double-flat';
  if (filename.includes('drill')) return 'drillmills';
  if (filename.includes('square') && filename.includes('straight')) return 'straight-flute-square';
  if (filename.includes('ball') && filename.includes('straight')) return 'straight-flute-ball';
  if (filename.includes('square mini')) return 'mini-square';
  if (filename.includes('ball mini')) return 'mini-ball';
  if (filename.includes('square taper')) return 'taper-square';
  if (filename.includes('ball taper')) return 'taper-ball';
  if (filename.includes('short') && !filename.includes('necked') && !filename.includes('reduced')) return 'short-flute';
  if (filename.includes('necked')) return 'short-flute-necked';
  if (filename.includes('reduced')) return 'short-flute-reduced';
  return 'square-endmills'; // default
}

// Helper function to determine dimension type
function getDimensionType(filename: string): DimensionType {
  if (filename.toLowerCase().includes('met')) return 'metric';
  if (filename.toLowerCase().includes('extra long')) return 'extra-long';
  return 'fractional';
}

// Helper function to validate CSV data against format
function validateCSVData(data: CSVRow[], format: string[]): boolean {
  return format.every(column => {
    // Check if required columns exist
    if (['OD', 'LOC', 'OAL'].includes(column)) {
      return data.every(row => row[column]);
    }
    return true; // Optional columns
  });
}

// Process a single CSV file
function processCSVFile(filePath: string, filename: string): Product[] {
  const data = readCSV(filePath);
  const productType = getProductType(filename);
  const dimensionType = getDimensionType(filename);
  const format = csvFormats[productType];

  if (!validateCSVData(data, format)) {
    console.warn(`Warning: File ${filename} does not match expected format for ${productType}`);
    return [];
  }

  return data.map((row: CSVRow, index: number) => {
    const basePartNumber = row['2-Flute'] || row['3-Flute'] || row['4-Flute'] || row['6-Flute'] || '';
    
    return {
      id: `${productType}-${index}`,
      sku: basePartNumber,
      name: `${productType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - ${row.OD}${dimensionType === 'metric' ? 'mm' : '"'}`,
      category: 'standard-endmills',
      subcategory: productType,
      description: `${productType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} with ${row.LOC}${dimensionType === 'metric' ? 'mm' : '"'} length of cut`,
      image: '/src/components/images/products/endmill.png',
      specifications: {
        diameter: row.OD,
        lengthOfCut: row.LOC,
        shankDiameter: row.SHK || row.OD, // For double end mills, shank diameter is same as OD
        overallLength: row.OAL,
        radius: row.Radius,
        taperAngle: row['Taper Angle'],
        neckLength: row['Neck Length'],
        dimensionType,
        coating: 'Uncoated',
        partNumber: basePartNumber
      },
      variants: {
        twoFlute: row['2-Flute'] || '',
        threeFlute: row['3-Flute'] || '',
        fourFlute: row['4-Flute'] || '',
        sixFlute: row['6-Flute'] || '',
        twoFlutePowerA: row['2-F Power A'] || '',
        threeFlutePowerA: row['3-F Power A'] || '',
        fourFlutePowerA: row['4-F Power A'] || '',
        sixFlutePowerA: row['6-F Power A'] || ''
      }
    };
  });
}

// Main processing function
async function processAllProducts(): Promise<void> {
  try {
    console.log('Starting CSV processing...');
    
    // Read all CSV files from csv_data directory
    const csvDir = path.join(process.cwd(), 'csv_data');
    const files = fs.readdirSync(csvDir).filter((file: string) => file.endsWith('.csv'));
    
    let allProducts: Product[] = [];
    
    // Process each CSV file
    for (const file of files) {
      console.log(`Processing ${file}...`);
      const filePath = path.join(csvDir, file);
      const products = processCSVFile(filePath, file);
      allProducts = [...allProducts, ...products];
    }

    // Write to JSON file
    const outputPath = path.join(process.cwd(), 'src', 'data', 'processed_products.json');
    fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2));

    console.log(`Successfully processed ${allProducts.length} products`);
    console.log(`Results saved to ${outputPath}`);
  } catch (error) {
    console.error('Error processing products:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
}

// Run the processing
processAllProducts();
