import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse/sync';

interface ProductData {
  OD: string;
  LOC: string;
  SHK: string;
  OAL: string;
  "2Flute"?: string;
  "3Flute"?: string;
  "4Flute"?: string;
  "2Flute - PowerA"?: string;
  "3Flute - PowerA"?: string;
  "4Flute - PowerA"?: string;
  "2-Flute"?: string;
  "3-Flute"?: string;
  "4 Flute"?: string;
  "2-Flute PowerA"?: string;
  "3- Flute PowerA"?: string;
  "4 Flute PowerA"?: string;
  "Uncoated"?: string;
  "PowerA"?: string;
}

function processCSVFiles(): void {
  try {
    // Process Metric Square Endmills
    console.log('Processing Metric CSV...');
    const metricData = readFileSync('MET Square Endmills.csv', 'utf-8');
    const metricProducts = parse(metricData, {
      columns: true,
      skip_empty_lines: true
    }) as ProductData[];
    console.log(`Processed ${metricProducts.length} metric products`);

    // Process Fractional Square Endmills
    console.log('Processing Fractional CSV...');
    const fractionalData = readFileSync('Fractional Square Endmills (1).csv', 'utf-8');
    const fractionalProducts = parse(fractionalData, {
      columns: true,
      skip_empty_lines: true
    }) as ProductData[];
    console.log(`Processed ${fractionalProducts.length} fractional products`);

    // Process Extra Long Length Square Endmills
    console.log('Processing Extra Long CSV...');
    const extraLongData = readFileSync('MET Extra Long Length Square Endmills.csv', 'utf-8');
    const extraLongProducts = parse(extraLongData, {
      columns: true,
      skip_empty_lines: true
    }) as ProductData[];
    console.log(`Processed ${extraLongProducts.length} extra long products`);

    // Format the data into our catalog structure
    const catalogData = {
      categories: [
        {
          id: 'square-end-mills',
          name: 'Square End Mills',
          description: 'Precision square end mills for milling and profiling operations',
          subcategories: [
            {
              id: 'metric-square',
              name: 'Metric Square End Mills',
              description: 'Standard metric square end mills for general milling operations',
              dimensionType: 'metric' as const,
              products: metricProducts.map(p => ({
                id: p['2Flute'] || p['3Flute'] || p['4Flute'] || '',
                specifications: {
                  diameter: p.OD,
                  lengthOfCut: p.LOC,
                  shankDiameter: p.SHK,
                  overallLength: p.OAL,
                  variants: {
                    twoFlute: p['2Flute'],
                    threeFlute: p['3Flute'],
                    fourFlute: p['4Flute'],
                    twoFlutePowerA: p['2Flute - PowerA'],
                    threeFlutePowerA: p['3Flute - PowerA'],
                    fourFlutePowerA: p['4Flute - PowerA']
                  }
                }
              }))
            },
            {
              id: 'fractional-square',
              name: 'Fractional Square End Mills',
              description: 'Standard fractional square end mills for general milling operations',
              dimensionType: 'fractional' as const,
              products: fractionalProducts.map(p => ({
                id: p['2-Flute'] || p['3-Flute'] || p['4 Flute'] || '',
                specifications: {
                  diameter: p.OD,
                  lengthOfCut: p.LOC,
                  shankDiameter: p.SHK,
                  overallLength: p.OAL,
                  variants: {
                    twoFlute: p['2-Flute'],
                    threeFlute: p['3-Flute'],
                    fourFlute: p['4 Flute'],
                    twoFlutePowerA: p['2-Flute PowerA'],
                    threeFlutePowerA: p['3- Flute PowerA'],
                    fourFlutePowerA: p['4 Flute PowerA']
                  }
                }
              }))
            },
            {
              id: 'extra-long-square',
              name: 'Extra Long Square End Mills',
              description: 'Extended length square end mills for deep milling operations',
              dimensionType: 'metric' as const,
              products: extraLongProducts.map(p => ({
                id: p.Uncoated || '',
                specifications: {
                  diameter: p.OD,
                  lengthOfCut: p.LOC,
                  shankDiameter: p.SHK,
                  overallLength: p.OAL,
                  variants: {
                    uncoated: p.Uncoated,
                    powerA: p.PowerA
                  }
                }
              }))
            }
          ]
        }
      ]
    };

    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), 'src', 'data');
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    // Save the processed data
    const outputPath = join(dataDir, 'processedCatalog.json');
    writeFileSync(outputPath, JSON.stringify(catalogData, null, 2));
    
    console.log('\nData Processing Summary:');
    console.log('------------------------');
    console.log(`Metric Products: ${metricProducts.length}`);
    console.log(`Fractional Products: ${fractionalProducts.length}`);
    console.log(`Extra Long Products: ${extraLongProducts.length}`);
    console.log(`\nData saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('Error processing CSVs:', error);
    process.exit(1);
  }
}

// Run the script
processCSVFiles();
