const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Helper function to read and parse CSV
function readCSV(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
}

// Process Fractional Square Endmills
function processFractionalEndmills(data: any[]) {
  return data.map((row: any, index: number) => ({
    id: `fractional-square-${index}`,
    sku: row['2-Flute'] || row['3-Flute'] || row['4 Flute'] || '',
    name: `Fractional Square End Mill - ${row.OD}"`,
    category: 'standard-endmills',
    subcategory: 'square-endmills',
    subType: 'fractional-square',
    description: `Fractional square end mill with ${row.LOC}" length of cut`,
    image: '/src/components/images/products/endmill.png',
    specifications: {
      diameter: row.OD,
      lengthOfCut: row.LOC,
      shankDiameter: row.SHK,
      overallLength: row.OAL,
      dimensionType: 'fractional',
      coating: 'Uncoated',
      partNumber: row['2-Flute'] || row['3-Flute'] || row['4 Flute'] || ''
    },
    variants: {
      twoFlute: row['2-Flute'] || '',
      threeFlute: row['3-Flute'] || '',
      fourFlute: row['4 Flute'] || '',
      twoFlutePowerA: row['2-Flute PowerA'] || '',
      threeFlutePowerA: row['3- Flute PowerA'] || '',
      fourFlutePowerA: row['4 Flute PowerA'] || ''
    }
  }));
}

// Process Metric Square Endmills
function processMetricEndmills(data: any[]) {
  return data.map((row: any, index: number) => ({
    id: `metric-square-${index}`,
    sku: row['2Flute'] || row['3Flute'] || row['4Flute'] || '',
    name: `Metric Square End Mill - ${row.OD}mm`,
    category: 'standard-endmills',
    subcategory: 'square-endmills',
    subType: 'metric-square',
    description: `Metric square end mill with ${row.LOC}mm length of cut`,
    image: '/src/components/images/products/endmill.png',
    specifications: {
      diameter: row.OD,
      lengthOfCut: row.LOC,
      shankDiameter: row.SHK,
      overallLength: row.OAL,
      dimensionType: 'metric',
      coating: 'Uncoated',
      partNumber: row['2Flute'] || row['3Flute'] || row['4Flute'] || ''
    },
    variants: {
      twoFlute: row['2Flute'] || '',
      threeFlute: row['3Flute'] || '',
      fourFlute: row['4Flute'] || '',
      twoFlutePowerA: row['2Flute - PowerA'] || '',
      threeFlutePowerA: row['3Flute - PowerA'] || '',
      fourFlutePowerA: row['4Flute - PowerA'] || ''
    }
  }));
}

// Process Extra Long Square Endmills
function processExtraLongEndmills(data: any[]) {
  return data.map((row: any, index: number) => ({
    id: `extra-long-square-${index}`,
    sku: row['Uncoated'] || '',
    name: `Extra Long Square End Mill - ${row.OD}mm`,
    category: 'standard-endmills',
    subcategory: 'square-endmills',
    subType: 'extra-long-square',
    description: `Extra long square end mill with ${row.LOC}mm length of cut`,
    image: '/src/components/images/products/endmill.png',
    specifications: {
      diameter: row.OD,
      lengthOfCut: row.LOC,
      shankDiameter: row.SHK,
      overallLength: row.OAL,
      dimensionType: 'extra-long',
      coating: 'Uncoated',
      partNumber: row['Uncoated'] || ''
    },
    variants: {
      uncoated: row['Uncoated'] || '',
      powerA: row['PowerA'] || ''
    }
  }));
}

// Main processing function
async function processAllProducts() {
  try {
    // Read CSV files
    const fractionalData = readCSV(path.join('..', '..', 'Fractional Square Endmills (1).csv'));
    const metricData = readCSV(path.join('..', '..', 'MET Square Endmills.csv'));
    const extraLongData = readCSV(path.join('..', '..', 'MET Extra Long Length Square Endmills.csv'));

    // Process each dataset
    const fractionalProducts = processFractionalEndmills(fractionalData);
    const metricProducts = processMetricEndmills(metricData);
    const extraLongProducts = processExtraLongEndmills(extraLongData);

    // Combine all products
    const processedProducts = {
      fractional: fractionalProducts,
      metric: metricProducts,
      extraLong: extraLongProducts
    };

    // Write to JSON file
    fs.writeFileSync(
      path.join('..', 'data', 'processed_products.json'),
      JSON.stringify(processedProducts, null, 2)
    );

    console.log('Successfully processed all products');
  } catch (error) {
    console.error('Error processing products:', error);
  }
}

// Run the processing
processAllProducts();
