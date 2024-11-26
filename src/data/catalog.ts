import { Category, Product } from '../types/catalog';
import processedProducts from './processed_products.json';
import cat1 from '../components/images/cat1.png';
import cat2 from '../components/images/cat2.png';
import cat3 from '../components/images/cat3.png';
import cat4 from '../components/images/cat4.png';
import cat5 from '../components/images/cat5.png';
import cat6 from '../components/images/cat6.png';
import cat7 from '../components/images/cat7.png';
import cat8 from '../components/images/cat8.png';

export const products: Product[] = processedProducts as Product[];

export const categories: Category[] = [
  {
    id: 'standard-endmills',
    name: 'STANDARD ENDMILLS',
    description: 'Standard precision end mills for general milling applications',
    image: cat1,
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
      },
      {
        id: 'ball-endmills',
        name: 'BALL END MILLS',
        description: 'Ball nose end mills for contour milling',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute', '2-F Power A', '4-F Power A'],
        subTypes: [
          {
            id: 'fractional-ball',
            name: 'Fractional Ball End Mills',
            description: 'Imperial dimensioned ball end mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-ball',
            name: 'Metric Ball End Mills',
            description: 'Metric dimensioned ball end mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      },
      {
        id: 'corner-radius',
        name: 'CORNER RADIUS END MILLS',
        description: 'End mills with corner radius for smooth transitions',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Radius', '2-Flute', '4-Flute', '2-F Power A', '4-F Power A'],
        subTypes: [
          {
            id: 'fractional-corner-radius',
            name: 'Fractional Corner Radius End Mills',
            description: 'Imperial dimensioned corner radius end mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Radius']
          },
          {
            id: 'metric-corner-radius',
            name: 'Metric Corner Radius End Mills',
            description: 'Metric dimensioned corner radius end mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Radius']
          }
        ]
      },
      {
        id: '6-flute',
        name: '6 FLUTE END MILLS',
        description: 'High efficiency end mills with 6 flutes',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '6-Flute', '6-F Power A'],
        subTypes: [
          {
            id: 'fractional-6-flute',
            name: 'Fractional 6 Flute End Mills',
            description: 'Imperial dimensioned 6 flute end mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-6-flute',
            name: 'Metric 6 Flute End Mills',
            description: 'Metric dimensioned 6 flute end mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      },
      {
        id: 'double-end-square',
        name: 'DOUBLE END SQUARE END MILLS',
        description: 'Double ended square end mills',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-double-square',
            name: 'Fractional Double End Square Mills',
            description: 'Imperial dimensioned double end square mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'OAL']
          },
          {
            id: 'metric-double-square',
            name: 'Metric Double End Square Mills',
            description: 'Metric dimensioned double end square mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'OAL']
          }
        ]
      },
      {
        id: 'double-end-ball',
        name: 'DOUBLE END BALL END MILLS',
        description: 'Double ended ball nose end mills',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-double-ball',
            name: 'Fractional Double End Ball Mills',
            description: 'Imperial dimensioned double end ball mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'OAL']
          },
          {
            id: 'metric-double-ball',
            name: 'Metric Double End Ball Mills',
            description: 'Metric dimensioned double end ball mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'OAL']
          }
        ]
      },
      {
        id: 'square-double-flat',
        name: 'SQUARE DOUBLE END WITH FLAT',
        description: 'Double ended square end mills with flat',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-square-double-flat',
            name: 'Fractional Square Double End with Flat',
            description: 'Imperial dimensioned square double end mills with flat',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'OAL']
          }
        ]
      },
      {
        id: 'ball-double-flat',
        name: 'BALL DOUBLE END WITH FLAT',
        description: 'Double ended ball nose end mills with flat',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-ball-double-flat',
            name: 'Fractional Ball Double End with Flat',
            description: 'Imperial dimensioned ball double end mills with flat',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'OAL']
          }
        ]
      },
      {
        id: 'drillmills',
        name: '90° DRILLMILLS',
        description: 'Combined drilling and milling tools with 90° point',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '3-Flute'],
        subTypes: [
          {
            id: 'fractional-drillmills',
            name: 'Fractional 90° Drillmills',
            description: 'Imperial dimensioned 90° drillmills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-drillmills',
            name: 'Metric 90° Drillmills',
            description: 'Metric dimensioned 90° drillmills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      },
      {
        id: 'straight-flute-square',
        name: 'STRAIGHT FLUTE SQUARE END MILLS',
        description: 'Square end mills with straight flutes',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-straight-square',
            name: 'Fractional Straight Flute Square Mills',
            description: 'Imperial dimensioned straight flute square mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-straight-square',
            name: 'Metric Straight Flute Square Mills',
            description: 'Metric dimensioned straight flute square mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      },
      {
        id: 'straight-flute-ball',
        name: 'STRAIGHT FLUTE BALL END MILLS',
        description: 'Ball nose end mills with straight flutes',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-straight-ball',
            name: 'Fractional Straight Flute Ball Mills',
            description: 'Imperial dimensioned straight flute ball mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-straight-ball',
            name: 'Metric Straight Flute Ball Mills',
            description: 'Metric dimensioned straight flute ball mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      },
      {
        id: 'mini-square',
        name: 'SQUARE END MINI MILLS',
        description: 'Miniature square end mills',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-square-mini',
            name: 'Fractional Square Mini Mills',
            description: 'Imperial dimensioned square mini mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-square-mini',
            name: 'Metric Square Mini Mills',
            description: 'Metric dimensioned square mini mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      },
      {
        id: 'mini-ball',
        name: 'BALL END MINI MILLS',
        description: 'Miniature ball nose end mills',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-ball-mini',
            name: 'Fractional Ball Mini Mills',
            description: 'Imperial dimensioned ball mini mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-ball-mini',
            name: 'Metric Ball Mini Mills',
            description: 'Metric dimensioned ball mini mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      },
      {
        id: 'taper-square',
        name: 'SQUARE END TAPERMILLS',
        description: 'Square end mills with tapered profile',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Taper Angle', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-square-taper',
            name: 'Fractional Square Tapermills',
            description: 'Imperial dimensioned square tapermills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Taper Angle']
          }
        ]
      },
      {
        id: 'taper-ball',
        name: 'BALL END TAPERMILLS',
        description: 'Ball nose end mills with tapered profile',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Taper Angle', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-ball-taper',
            name: 'Fractional Ball Tapermills',
            description: 'Imperial dimensioned ball tapermills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Taper Angle']
          }
        ]
      },
      {
        id: 'short-flute',
        name: 'SHORT FLUTE END MILLS',
        description: 'End mills with short flute length',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-short-flute',
            name: 'Fractional Short Flute Mills',
            description: 'Imperial dimensioned short flute mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          },
          {
            id: 'metric-short-flute',
            name: 'Metric Short Flute Mills',
            description: 'Metric dimensioned short flute mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      },
      {
        id: 'short-flute-necked',
        name: 'SHORT FLUTE NECKED END MILLS',
        description: 'End mills with short flute and necked profile',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Neck Length', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-short-necked',
            name: 'Fractional Short Flute Necked Mills',
            description: 'Imperial dimensioned short flute necked mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Neck Length']
          },
          {
            id: 'metric-short-necked',
            name: 'Metric Short Flute Necked Mills',
            description: 'Metric dimensioned short flute necked mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Neck Length']
          }
        ]
      },
      {
        id: 'short-flute-reduced',
        name: 'SHORT FLUTE REDUCED SHANK',
        description: 'End mills with short flute and reduced shank',
        categoryId: 'standard-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'fractional-short-reduced',
            name: 'Fractional Short Flute Reduced Shank',
            description: 'Imperial dimensioned short flute reduced shank mills',
            dimensionType: 'fractional',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      }
    ]
  },
  {
    id: 'high-performance-endmills',
    name: 'HIGH PERFORMANCE ENDMILLS',
    description: 'Advanced end mills for high-speed and demanding applications',
    image: cat2,
    background: 'bg-green-900/20',
    subcategories: [
      {
        id: 'high-feed-endmills',
        name: 'HIGH FEED END MILLS',
        description: 'End mills optimized for high feed rate machining',
        categoryId: 'high-performance-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', '2-Flute', '3-Flute', '4-Flute'],
        subTypes: [
          {
            id: 'metric-high-feed',
            name: 'Metric High Feed End Mills',
            description: 'Metric dimensioned high feed end mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      }
    ]
  },
  {
    id: 'specialty-endmills',
    name: 'SPECIALTY ENDMILLS',
    description: 'Specialized end mills for unique cutting requirements',
    image: cat3,
    background: 'bg-purple-900/20',
    subcategories: [
      {
        id: 'chamfer-mills',
        name: 'CHAMFER MILLS',
        description: 'End mills for creating precise chamfers',
        categoryId: 'specialty-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Angle'],
        subTypes: [
          {
            id: 'metric-chamfer',
            name: 'Metric Chamfer Mills',
            description: 'Metric dimensioned chamfer mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL', 'Angle']
          }
        ]
      }
    ]
  },
  {
    id: 'roughing-endmills',
    name: 'ROUGHING ENDMILLS',
    description: 'Heavy duty end mills for maximum material removal',
    image: cat4,
    background: 'bg-red-900/20',
    subcategories: [
      {
        id: 'ripcut-endmills',
        name: 'RIPCUT END MILLS',
        description: 'End mills with aggressive tooth geometry for roughing',
        categoryId: 'roughing-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL'],
        subTypes: [
          {
            id: 'metric-ripcut',
            name: 'Metric Ripcut End Mills',
            description: 'Metric dimensioned ripcut end mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      }
    ]
  },
  {
    id: 'thread-mills',
    name: 'THREAD MILLS',
    description: 'Precision tools for thread milling operations',
    image: cat5,
    background: 'bg-yellow-900/20',
    subcategories: [
      {
        id: 'single-form-thread',
        name: 'SINGLE FORM THREAD MILLS',
        description: 'Thread mills for single form threading',
        categoryId: 'thread-mills',
        specifications: ['Thread Size', 'LOC', 'SHK', 'OAL'],
        subTypes: [
          {
            id: 'metric-single-thread',
            name: 'Metric Single Form Thread Mills',
            description: 'Metric dimensioned single form thread mills',
            dimensionType: 'metric',
            specifications: ['Thread Size', 'LOC', 'SHK', 'OAL']
          }
        ]
      }
    ]
  },
  {
    id: 'micro-endmills',
    name: 'MICRO ENDMILLS',
    description: 'Ultra-precise tools for micro-machining applications',
    image: cat6,
    background: 'bg-indigo-900/20',
    subcategories: [
      {
        id: 'micro-square',
        name: 'MICRO SQUARE END MILLS',
        description: 'Micro-sized square end mills',
        categoryId: 'micro-endmills',
        specifications: ['OD', 'LOC', 'SHK', 'OAL'],
        subTypes: [
          {
            id: 'metric-micro-square',
            name: 'Metric Micro Square End Mills',
            description: 'Metric dimensioned micro square end mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      }
    ]
  },
  {
    id: 'carbide-burrs',
    name: 'CARBIDE BURRS',
    description: 'Rotary cutting tools for deburring and surface finishing',
    image: cat7,
    background: 'bg-orange-900/20',
    subcategories: [
      {
        id: 'cylindrical-burrs',
        name: 'CYLINDRICAL BURRS',
        description: 'Cylindrical shaped carbide burrs',
        categoryId: 'carbide-burrs',
        specifications: ['OD', 'LOC', 'SHK', 'OAL'],
        subTypes: [
          {
            id: 'metric-cylindrical-burr',
            name: 'Metric Cylindrical Burrs',
            description: 'Metric dimensioned cylindrical burrs',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      }
    ]
  },
  {
    id: 'custom-solutions',
    name: 'CUSTOM SOLUTIONS',
    description: 'Customized cutting tools for specific applications',
    image: cat8,
    background: 'bg-teal-900/20',
    subcategories: [
      {
        id: 'custom-endmills',
        name: 'CUSTOM END MILLS',
        description: 'Custom designed end mills for specific applications',
        categoryId: 'custom-solutions',
        specifications: ['OD', 'LOC', 'SHK', 'OAL'],
        subTypes: [
          {
            id: 'metric-custom',
            name: 'Metric Custom End Mills',
            description: 'Metric dimensioned custom end mills',
            dimensionType: 'metric',
            specifications: ['OD', 'LOC', 'SHK', 'OAL']
          }
        ]
      }
    ]
  }
];
