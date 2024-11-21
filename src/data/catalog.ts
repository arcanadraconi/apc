import { Category, Product } from '../types/catalog';

export const categories: Category[] = [
  {
    id: 'standard-endmills',
    name: 'STANDARD ENDMILLS',
    description: 'Standard precision end mills for general milling applications',
    image: '/src/components/images/cat1.png',
    background: 'bg-blue-900/20',
    subcategories: [
      {
        id: 'square-endmills',
        name: 'SQUARE END MILLS',
        description: 'Standard square end mills with multiple flute options',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '3-Flute', '4-Flute', '2-F Power A', '3-F Power A', '4-F Power A'],
        subTypes: [
          {
            id: 'fractional-square',
            name: 'Fractional Square End Mills',
            description: 'Imperial dimensioned square end mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-square',
            name: 'Metric Square End Mills',
            description: 'Metric dimensioned square end mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'extra-long-square',
            name: 'Extra Long Square End Mills',
            description: 'Extended length square end mills',
            dimensionType: 'extra-long',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      }
    ]
  },
  {
    id: 'high-performance',
    name: 'HIGH PERFORMANCE',
    description: 'Advanced cutting tools for demanding applications',
    image: '/src/components/images/cat2.png',
    background: 'bg-purple-900/20',
    subcategories: [
      {
        id: 'variable-helix',
        name: 'VARIABLE HELIX END MILLS',
        description: 'Reduced vibration and improved stability',
        categoryId: 'high-performance',
        specifications: ['OD', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'specialty-endmills',
    name: 'SPECIALTY END MILLS',
    description: 'Specialized cutting tools for unique applications',
    image: '/src/components/images/cat3.png',
    background: 'bg-green-900/20',
    subcategories: [
      {
        id: 'chamfer-mills',
        name: 'CHAMFER MILLS',
        description: 'For precise edge breaking and chamfering',
        categoryId: 'specialty-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'threading-tools',
    name: 'THREADING TOOLS',
    description: 'Precision tools for thread milling operations',
    image: '/src/components/images/cat4.png',
    background: 'bg-red-900/20',
    subcategories: [
      {
        id: 'thread-mills',
        name: 'THREAD MILLS',
        description: 'For internal and external threading',
        categoryId: 'threading-tools',
        specifications: ['OD', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'drilling-tools',
    name: 'DRILLING TOOLS',
    description: 'High-precision drilling solutions',
    image: '/src/components/images/cat5.png',
    background: 'bg-yellow-900/20',
    subcategories: [
      {
        id: 'carbide-drills',
        name: 'CARBIDE DRILLS',
        description: 'Solid carbide drilling tools',
        categoryId: 'drilling-tools',
        specifications: ['OD', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'micro-tools',
    name: 'MICRO TOOLS',
    description: 'Ultra-precise tools for micro-machining',
    image: '/src/components/images/cat6.png',
    background: 'bg-indigo-900/20',
    subcategories: [
      {
        id: 'micro-endmills',
        name: 'MICRO END MILLS',
        description: 'Miniature cutting tools',
        categoryId: 'micro-tools',
        specifications: ['OD', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'indexable-tools',
    name: 'INDEXABLE TOOLS',
    description: 'Tools with replaceable cutting inserts',
    image: '/src/components/images/cat7.png',
    background: 'bg-pink-900/20',
    subcategories: [
      {
        id: 'indexable-endmills',
        name: 'INDEXABLE END MILLS',
        description: 'End mills with indexable inserts',
        categoryId: 'indexable-tools',
        specifications: ['OD', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'tool-holders',
    name: 'TOOL HOLDERS',
    description: 'Premium tool holding solutions',
    image: '/src/components/images/cat8.png',
    background: 'bg-orange-900/20',
    subcategories: [
      {
        id: 'collet-chucks',
        name: 'COLLET CHUCKS',
        description: 'Precision collet holding systems',
        categoryId: 'tool-holders',
        specifications: ['OD', 'LOC', 'SHK', 'OAL']
      }
    ]
  }
];

// Load processed products from JSON
const processedProductsData = await import('./processed_products.json');
export const products: Product[] = [
  ...processedProductsData.default.fractional,
  ...processedProductsData.default.metric,
  ...processedProductsData.default.extraLong
];

// Helper function to parse CSV data into products
export function parseCSVToProducts(csvData: string[][], subcategoryId: string): Product[] {
  return csvData.map((row, index) => {
    const [od, loc, shk, oal, twoFlute, threeFlute, fourFlute, twoFlutePowerA, threeFlutePowerA, fourFlutePowerA] = row;
    
    return {
      id: `${subcategoryId}-${index}`,
      sku: twoFlute || '',
      name: `End Mill - ${od}"`,
      category: 'standard-endmills',
      subcategory: subcategoryId,
      description: `End mill with ${loc}" length of cut`,
      image: '/src/components/images/products/endmill.png',
      specifications: {
        diameter: od,
        lengthOfCut: loc,
        shankDiameter: shk,
        overallLength: oal,
        flutes: twoFlute ? 2 : threeFlute ? 3 : 4,
        coating: 'Uncoated',
        partNumber: twoFlute || threeFlute || fourFlute || ''
      },
      variants: {
        ...(twoFlute && { twoFlute }),
        ...(threeFlute && { threeFlute }),
        ...(fourFlute && { fourFlute }),
        ...(twoFlutePowerA && { twoFlutePowerA }),
        ...(threeFlutePowerA && { threeFlutePowerA }),
        ...(fourFlutePowerA && { fourFlutePowerA })
      }
    };
  });
}
