import { Category, Product } from '../types/catalog';

export const categories: Category[] = [
  {
    id: 'endmills',
    name: 'ENDMILLS',
    description: 'Precision end mills for milling and profiling operations',
    image: '/images/categories/endmills.jpg',
    background: 'bg-blue-900',
    subcategories: [
      {
        id: 'square-end-mills',
        name: 'Square End Mills',
        description: 'Standard square end mills for general milling',
        categoryId: 'endmills',
        dimensionType: 'metric',
        specifications: [
          'Diameter Range: 1mm - 25mm',
          'Multiple Flute Options (2,3,4)',
          'PowerA Coating Available'
        ]
      },
      {
        id: 'ball-end-mills',
        name: 'Ball End Mills',
        description: '3D contour machining and profiling',
        categoryId: 'endmills',
        dimensionType: 'metric',
        specifications: [
          'Full Radius End',
          'Various Neck Lengths'
        ]
      },
      {
        id: 'corner-radius-end-mills',
        name: 'Corner Radius End Mills',
        description: 'End mills with rounded corners for improved tool life',
        categoryId: 'endmills',
        dimensionType: 'metric',
        specifications: [
          'Various Corner Radii',
          'Extended Tool Life'
        ]
      }
    ]
  },
  {
    id: 'high-performance-endmills',
    name: 'HIGH PERFORMANCE ENDMILLS',
    description: 'Advanced end mills for demanding applications',
    image: '/images/categories/high-performance-endmills.jpg',
    background: 'bg-red-900',
    subcategories: []
  },
  {
    id: 'pro-performance-endmills',
    name: 'PRO+ PERFORMANCE ENDMILLS',
    description: 'Premium grade tools for maximum performance',
    image: '/images/categories/pro-performance-endmills.jpg',
    background: 'bg-red-800',
    subcategories: []
  },
  {
    id: 'high-performance-routers',
    name: 'HIGH PERFORMANCE ROUTERS',
    description: 'Specialized routers for high-speed applications',
    image: '/images/categories/high-performance-routers.jpg',
    background: 'bg-purple-900',
    subcategories: []
  },
  {
    id: 'drills',
    name: 'DRILLS',
    description: 'Precision drilling solutions',
    image: '/images/categories/drills.jpg',
    background: 'bg-blue-800',
    subcategories: []
  },
  {
    id: 'reamers-threadmills',
    name: 'REAMERS AND THREADMILLS',
    description: 'Precision hole finishing and thread milling',
    image: '/images/categories/reamers-threadmills.jpg',
    background: 'bg-yellow-900',
    subcategories: []
  },
  {
    id: 'burs-fiberglass',
    name: 'BURS & FIBERGLASS ROUTING',
    description: 'Specialized tools for composite materials',
    image: '/images/categories/burs-fiberglass.jpg',
    background: 'bg-green-900',
    subcategories: []
  }
];

// Sample product data structure
export const products: Product[] = [
  {
    id: 'cr-001',
    sku: '204-454',
    name: 'Corner Radius End Mill - 1mm',
    category: 'endmills',
    subcategory: 'corner-radius-end-mills',
    description: 'Corner radius end mill with 0.45mm radius',
    image: '/images/products/corner-radius-endmill.png',
    specifications: {
      diameter: '1',
      lengthOfCut: '1/2',
      shankDiameter: '3',
      overallLength: 'L2',
      flutes: 2,
      coating: 'Uncoated',
      partNumber: '204-454'
    },
    variants: {
      twoFlute: '204-454',
      fourFlute: '211-454',
      twoFlutePowerA: '204-454-1',
      fourFlutePowerA: '211-454-1'
    }
  }
  // More products will be added from CSV data
];

// Helper function to parse CSV data into products
export function parseCSVToProducts(csvData: string[][], subcategoryId: string): Product[] {
  return csvData.map((row, index) => {
    const [od, loc, shk, oal, twoFlute, threeFlute, fourFlute, twoFlutePowerA, threeFlutePowerA, fourFlutePowerA] = row;
    
    return {
      id: `${subcategoryId}-${index}`,
      sku: twoFlute || '',
      name: `End Mill - ${od}${subcategoryId.includes('metric') ? 'mm' : '"'}`,
      category: 'endmills',
      subcategory: subcategoryId,
      description: `End mill with ${loc}${subcategoryId.includes('metric') ? 'mm' : '"'} length of cut`,
      image: '/images/products/endmill.png',
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
