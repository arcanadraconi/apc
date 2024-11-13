import { Category, Product } from '../types/catalog';

export const categories: Category[] = [
  {
    id: 'standard-endmills',
    name: 'STANDARD ENDMILLS',
    description: 'Standard precision end mills for general milling applications',
    image: '/src/components/images/cat1.png',
    background: 'bg-blue-900',
    subcategories: [
      // ... existing subcategories ...
    ]
  },
  {
    id: 'high-performance-endmills',
    name: 'HIGH PERFORMANCE ENDMILLS',
    description: 'Advanced end mills for superior performance and tool life',
    image: '/src/components/images/cat2.png',
    background: 'bg-purple-900',
    subcategories: [
      {
        id: 'v4-square-endmills',
        name: 'V4 Square End Mills',
        description: 'Variable helix and index design for reduced harmonics',
        categoryId: 'high-performance-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '4-Flute']
      },
      {
        id: 'v4-ball-endmills',
        name: 'V4 Ball End Mills',
        description: 'Variable helix ball nose design for 3D machining',
        categoryId: 'high-performance-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '4-Flute']
      }
    ]
  },
  {
    id: 'thread-mills',
    name: 'THREAD MILLS',
    description: 'Precision thread milling tools for various thread forms',
    image: '/src/components/images/cat3.png',
    background: 'bg-green-900',
    subcategories: [
      {
        id: 'un-thread-mills',
        name: 'UN Thread Mills',
        description: 'For unified national thread forms',
        categoryId: 'thread-mills',
        specifications: ['Thread Size', 'OD', 'LOC', 'SHK', 'OAL']
      },
      {
        id: 'metric-thread-mills',
        name: 'Metric Thread Mills',
        description: 'For metric thread forms',
        categoryId: 'thread-mills',
        specifications: ['Thread Size', 'OD', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'drills',
    name: 'DRILLS',
    description: 'High-performance drilling solutions',
    image: '/src/components/images/cat4.png',
    background: 'bg-red-900',
    subcategories: [
      {
        id: 'carbide-drills',
        name: 'Carbide Drills',
        description: 'Solid carbide drills for precision hole-making',
        categoryId: 'drills',
        specifications: ['Diameter', 'Drill Depth', 'OAL', 'Shank Type']
      },
      {
        id: 'high-performance-drills',
        name: 'High Performance Drills',
        description: 'Advanced geometry drills for difficult materials',
        categoryId: 'drills',
        specifications: ['Diameter', 'Drill Depth', 'OAL', 'Shank Type']
      }
    ]
  },
  {
    id: 'reamers',
    name: 'REAMERS',
    description: 'Precision hole finishing tools',
    image: '/src/components/images/cat5.png',
    background: 'bg-yellow-900',
    subcategories: [
      {
        id: 'carbide-reamers',
        name: 'Carbide Reamers',
        description: 'Solid carbide reamers for precise hole sizing',
        categoryId: 'reamers',
        specifications: ['Diameter', 'LOC', 'SHK', 'OAL']
      },
      {
        id: 'adjustable-reamers',
        name: 'Adjustable Reamers',
        description: 'Adjustable diameter reamers for flexible sizing',
        categoryId: 'reamers',
        specifications: ['Diameter Range', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'specialty-tools',
    name: 'SPECIALTY TOOLS',
    description: 'Custom and special application cutting tools',
    image: '/src/components/images/cat6.png',
    background: 'bg-indigo-900',
    subcategories: [
      {
        id: 'chamfer-mills',
        name: 'Chamfer Mills',
        description: 'For precise edge breaking and chamfering',
        categoryId: 'specialty-tools',
        specifications: ['Diameter', 'Angle', 'LOC', 'SHK', 'OAL']
      },
      {
        id: 'deburring-tools',
        name: 'Deburring Tools',
        description: 'For efficient burr removal and edge finishing',
        categoryId: 'specialty-tools',
        specifications: ['Diameter', 'Style', 'LOC', 'SHK', 'OAL']
      }
    ]
  },
  {
    id: 'micro-tools',
    name: 'MICRO TOOLS',
    description: 'Ultra-small diameter cutting tools',
    image: '/src/components/images/cat7.png',
    background: 'bg-pink-900',
    subcategories: [
      {
        id: 'micro-endmills',
        name: 'Micro End Mills',
        description: 'Miniature end mills for precision machining',
        categoryId: 'micro-tools',
        specifications: ['Diameter', 'LOC', 'SHK', 'OAL', 'Flutes']
      },
      {
        id: 'micro-drills',
        name: 'Micro Drills',
        description: 'Small diameter precision drills',
        categoryId: 'micro-tools',
        specifications: ['Diameter', 'Drill Depth', 'OAL', 'Shank Type']
      }
    ]
  },
  {
    id: 'indexable-tools',
    name: 'INDEXABLE TOOLS',
    description: 'Tools with replaceable cutting inserts',
    image: '/src/components/images/cat8.png',
    background: 'bg-cyan-900',
    subcategories: [
      {
        id: 'indexable-endmills',
        name: 'Indexable End Mills',
        description: 'End mills with indexable inserts',
        categoryId: 'indexable-tools',
        specifications: ['Body Diameter', 'Insert Size', 'LOC', 'SHK', 'OAL']
      },
      {
        id: 'indexable-drills',
        name: 'Indexable Drills',
        description: 'Drills with indexable inserts',
        categoryId: 'indexable-tools',
        specifications: ['Body Diameter', 'Insert Size', 'Drill Depth', 'Shank Type']
      }
    ]
  }
];

export const products: Product[] = [
  // Products will be populated from CSV/PDF data
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
