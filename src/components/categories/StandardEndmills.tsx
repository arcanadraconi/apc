import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, ShoppingCart } from 'lucide-react';

interface ToolData {
  OD: string;
  LOC: string;
  SHK: string;
  OAL: string;
  '2-Flute': string;
  '3-Flute': string;
  '4 Flute': string;
  '2-Flute PowerA': string;
  '3- Flute PowerA': string;
  '4 Flute PowerA': string;
  [key: string]: string;
}

interface StandardEndmillsProps {
  onAddToQuote: (item: { id: string; quantity: number; specs: string }) => void;
}

const subcategories = [
  {
    id: 'square-endmills',
    name: 'SQUARE END MILLS',
    description: 'Standard square end mills with multiple flute options',
    types: [
      {
        id: 'fractional-square',
        name: 'Fractional Square End Mills',
        description: 'Imperial dimensioned square end mills',
        csvFile: 'Fractional Square Endmills (2).csv'
      },
      {
        id: 'metric-square',
        name: 'Metric Square End Mills',
        description: 'Metric dimensioned square end mills',
        csvFile: 'MET Square Endmills (1).csv'
      },
      {
        id: 'extra-long-square',
        name: 'Extra Long Square End Mills',
        description: 'Extended length square end mills',
        csvFile: 'MET Extra Long Length Square Endmills (1).csv'
      }
    ]
  },
  {
    id: 'ball-endmills',
    name: 'BALL END MILLS',
    description: 'Ball nose end mills for contour milling',
    types: [
      {
        id: 'fractional-ball',
        name: 'Fractional Ball End Mills',
        description: 'Imperial dimensioned ball end mills',
        csvFile: 'Fractional Ball Endmills.csv'
      },
      {
        id: 'metric-ball',
        name: 'Metric Ball End Mills',
        description: 'Metric dimensioned ball end mills',
        csvFile: 'MET Ball Endmills.csv'
      },
      {
        id: 'extra-long-ball',
        name: 'Extra Long Ball End Mills',
        description: 'Extended length ball end mills',
        csvFile: 'MET Extra Long Length Ball Endmill.csv'
      }
    ]
  },
  {
    id: 'corner-radius',
    name: 'CORNER RADIUS END MILLS',
    description: 'End mills with corner radius for smooth transitions',
    types: [
      {
        id: 'fractional-corner-radius',
        name: 'Fractional Corner Radius End Mills',
        description: 'Imperial dimensioned corner radius end mills',
        csvFile: 'Fractional Corner Radius Endmills.csv'
      },
      {
        id: 'metric-corner-radius',
        name: 'Metric Corner Radius End Mills',
        description: 'Metric dimensioned corner radius end mills',
        csvFile: 'MET Corner Radius Endmills.csv'
      }
    ]
  },
  {
    id: '6-flute',
    name: '6 FLUTE END MILLS',
    description: 'High efficiency end mills with 6 flutes',
    types: [
      {
        id: 'fractional-6-flute',
        name: 'Fractional 6 Flute End Mills',
        description: 'Imperial dimensioned 6 flute end mills',
        csvFile: 'Fractional 6 Flute Endmills.csv'
      },
      {
        id: 'metric-6-flute',
        name: 'Metric 6 Flute End Mills',
        description: 'Metric dimensioned 6 flute end mills',
        csvFile: 'MET 6 Flute Square.csv'
      }
    ]
  },
  {
    id: 'double-end-square',
    name: 'DOUBLE END SQUARE END MILLS',
    description: 'Double ended square end mills',
    types: [
      {
        id: 'fractional-double-square',
        name: 'Fractional Double End Square Mills',
        description: 'Imperial dimensioned double end square mills',
        csvFile: 'Fractional Square End Double End.csv'
      },
      {
        id: 'metric-double-square',
        name: 'Metric Double End Square Mills',
        description: 'Metric dimensioned double end square mills',
        csvFile: 'MET Square End Double End.csv'
      }
    ]
  },
  {
    id: 'double-end-ball',
    name: 'DOUBLE END BALL END MILLS',
    description: 'Double ended ball nose end mills',
    types: [
      {
        id: 'fractional-double-ball',
        name: 'Fractional Double End Ball Mills',
        description: 'Imperial dimensioned double end ball mills',
        csvFile: 'Fractional Ball Double End.csv'
      },
      {
        id: 'metric-double-ball',
        name: 'Metric Double End Ball Mills',
        description: 'Metric dimensioned double end ball mills',
        csvFile: 'Mat Ball Double End.csv'
      }
    ]
  },
  {
    id: 'square-double-flat',
    name: 'SQUARE DOUBLE END WITH FLAT',
    description: 'Double ended square end mills with flat',
    types: [
      {
        id: 'fractional-square-double-flat',
        name: 'Fractional Square Double End with Flat',
        description: 'Imperial dimensioned square double end mills with flat',
        csvFile: 'Fractional SQ DBL End with Flat.csv'
      }
    ]
  },
  {
    id: 'ball-double-flat',
    name: 'BALL DOUBLE END WITH FLAT',
    description: 'Double ended ball nose end mills with flat',
    types: [
      {
        id: 'fractional-ball-double-flat',
        name: 'Fractional Ball Double End with Flat',
        description: 'Imperial dimensioned ball double end mills with flat',
        csvFile: 'FRT - Ball Double End with Flat.csv'
      }
    ]
  },
  {
    id: 'drillmills',
    name: '90° DRILLMILLS',
    description: 'Combined drilling and milling tools with 90° point',
    types: [
      {
        id: 'fractional-drillmills',
        name: 'Fractional 90° Drillmills',
        description: 'Imperial dimensioned 90° drillmills',
        csvFile: 'FRT - Drill Mills.csv'
      },
      {
        id: 'metric-drillmills',
        name: 'Metric 90° Drillmills',
        description: 'Metric dimensioned 90° drillmills',
        csvFile: 'MET 90 Degree DillMills.csv'
      }
    ]
  },
  {
    id: 'straight-flute-square',
    name: 'STRAIGHT FLUTE SQUARE END MILLS',
    description: 'Square end mills with straight flutes',
    types: [
      {
        id: 'fractional-straight-square',
        name: 'Fractional Straight Flute Square Mills',
        description: 'Imperial dimensioned straight flute square mills',
        csvFile: 'FRT - Square End Straight Flute.csv'
      },
      {
        id: 'metric-straight-square',
        name: 'Metric Straight Flute Square Mills',
        description: 'Metric dimensioned straight flute square mills',
        csvFile: 'MET Square End Straight Flute.csv'
      }
    ]
  },
  {
    id: 'straight-flute-ball',
    name: 'STRAIGHT FLUTE BALL END MILLS',
    description: 'Ball nose end mills with straight flutes',
    types: [
      {
        id: 'fractional-straight-ball',
        name: 'Fractional Straight Flute Ball Mills',
        description: 'Imperial dimensioned straight flute ball mills',
        csvFile: 'FRT - Ball End Straight Flute.csv'
      },
      {
        id: 'metric-straight-ball',
        name: 'Metric Straight Flute Ball Mills',
        description: 'Metric dimensioned straight flute ball mills',
        csvFile: 'MET Ball End Straight Flute.csv'
      }
    ]
  },
  {
    id: 'mini-square',
    name: 'SQUARE END MINI MILLS',
    description: 'Miniature square end mills',
    types: [
      {
        id: 'fractional-square-mini',
        name: 'Fractional Square Mini Mills',
        description: 'Imperial dimensioned square mini mills',
        csvFile: 'FRT - Square Mini Mills.csv'
      }
    ]
  },
  {
    id: 'mini-ball',
    name: 'BALL END MINI MILLS',
    description: 'Miniature ball nose end mills',
    types: [
      {
        id: 'fractional-ball-mini',
        name: 'Fractional Ball Mini Mills',
        description: 'Imperial dimensioned ball mini mills',
        csvFile: 'FRT Ball Mini Mills.csv'
      },
      {
        id: 'metric-ball-mini',
        name: 'Metric Ball Mini Mills',
        description: 'Metric dimensioned ball mini mills',
        csvFile: 'MET Ball Mini Mills.csv'
      }
    ]
  },
  {
    id: 'taper-square',
    name: 'SQUARE END TAPERMILLS',
    description: 'Square end mills with tapered profile',
    types: [
      {
        id: 'fractional-square-taper',
        name: 'Fractional Square Tapermills',
        description: 'Imperial dimensioned square tapermills',
        csvFile: 'FRT Square Taper Mills.csv'
      }
    ]
  },
  {
    id: 'taper-ball',
    name: 'BALL END TAPERMILLS',
    description: 'Ball nose end mills with tapered profile',
    types: [
      {
        id: 'fractional-ball-taper',
        name: 'Fractional Ball Tapermills',
        description: 'Imperial dimensioned ball tapermills',
        csvFile: 'FRT Ball Taper Mills.csv'
      }
    ]
  },
  {
    id: 'short-flute',
    name: 'SHORT FLUTE END MILLS',
    description: 'End mills with short flute length',
    types: [
      {
        id: 'metric-short-flute',
        name: 'Metric Short Flute Mills',
        description: 'Metric dimensioned short flute mills',
        csvFile: 'MET 40 Degree Short Flute Square.csv'
      }
    ]
  },
  {
    id: 'short-flute-necked',
    name: 'SHORT FLUTE NECKED END MILLS',
    description: 'End mills with short flute and necked profile',
    types: [
      {
        id: 'metric-short-necked',
        name: 'Metric Short Flute Necked Mills',
        description: 'Metric dimensioned short flute necked mills',
        csvFile: 'MET Short Flute Necked Square.csv'
      }
    ]
  },
  {
    id: 'short-flute-reduced',
    name: 'SHORT FLUTE REDUCED SHANK',
    description: 'End mills with short flute and reduced shank',
    types: [
      {
        id: 'metric-short-flute-reduced-square',
        name: 'Metric Short Flute Square End Reduced Shank',
        description: 'Metric dimensioned short flute square end mills with reduced shank',
        csvFile: 'MET Short Flute Square End Reduced Shank.csv'
      },
      {
        id: 'metric-short-flute-reduced-ball',
        name: 'Metric Short Flute Ball End Reduced Shank',
        description: 'Metric dimensioned short flute ball end mills with reduced shank',
        csvFile: 'MET Short Flute Ball End Reduced Shank.csv'
      }
    ]
  }
];

const StandardEndmills: React.FC<StandardEndmillsProps> = ({ onAddToQuote }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategories[0]);
  const [selectedType, setSelectedType] = useState<null | {
    id: string;
    name: string;
    description: string;
    csvFile: string;
  }>(null);
  const [toolData, setToolData] = useState<ToolData[]>([]);
  const [selectedSpecs, setSelectedSpecs] = useState<{
    OD: string;
    LOC: string;
    SHK: string;
    OAL: string;
    flute: string;
  }>({
    OD: '',
    LOC: '',
    SHK: '',
    OAL: '',
    flute: ''
  });

  useEffect(() => {
    // Reset type when subcategory changes
    setSelectedType(null);
    setSelectedSpecs({
      OD: '',
      LOC: '',
      SHK: '',
      OAL: '',
      flute: ''
    });
  }, [selectedSubcategory]);

  useEffect(() => {
    // Load CSV data when type changes
    if (selectedType) {
      fetch(`/csv_data/${selectedType.csvFile}`)
        .then(response => response.text())
        .then(text => {
          const rows = text.split('\n').slice(1); // Skip header
          const data = rows.map(row => {
            const values = row.split(',').map(v => v.replace(/"/g, ''));
            return {
              OD: values[0],
              LOC: values[1],
              SHK: values[2],
              OAL: values[3],
              '2-Flute': values[4],
              '3-Flute': values[5],
              '4 Flute': values[6],
              '2-Flute PowerA': values[7],
              '3- Flute PowerA': values[8],
              '4 Flute PowerA': values[9]
            };
          });
          setToolData(data);
          // Reset selections when changing type
          setSelectedSpecs({
            OD: '',
            LOC: '',
            SHK: '',
            OAL: '',
            flute: ''
          });
        });
    }
  }, [selectedType]);

  const getAvailableValues = (field: keyof typeof selectedSpecs) => {
    if (!toolData.length) return [];

    let filteredData = toolData;

    // Filter based on previous selections
    if (field !== 'OD' && selectedSpecs.OD) {
      filteredData = filteredData.filter(item => item.OD === selectedSpecs.OD);
    }
    if (field !== 'LOC' && selectedSpecs.LOC) {
      filteredData = filteredData.filter(item => item.LOC === selectedSpecs.LOC);
    }
    if (field !== 'SHK' && selectedSpecs.SHK) {
      filteredData = filteredData.filter(item => item.SHK === selectedSpecs.SHK);
    }
    if (field !== 'OAL' && selectedSpecs.OAL) {
      filteredData = filteredData.filter(item => item.OAL === selectedSpecs.OAL);
    }

    // Get unique values for the field
    if (field === 'flute') {
      return ['2-Flute', '3-Flute', '4 Flute', '2-Flute PowerA', '3- Flute PowerA', '4 Flute PowerA'];
    }

    const values = Array.from(new Set(filteredData.map(item => item[field])));
    return values;
  };

  const handleSpecChange = (field: keyof typeof selectedSpecs, value: string) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [field]: value,
      // Clear subsequent fields
      ...(field === 'OD' && { LOC: '', SHK: '', OAL: '', flute: '' }),
      ...(field === 'LOC' && { SHK: '', OAL: '', flute: '' }),
      ...(field === 'SHK' && { OAL: '', flute: '' }),
      ...(field === 'OAL' && { flute: '' })
    }));
  };

  const getMatchingTool = () => {
    if (!selectedSpecs.OD || !selectedSpecs.LOC || !selectedSpecs.SHK || !selectedSpecs.OAL || !selectedSpecs.flute) {
      return null;
    }

    return toolData.find(tool => 
      tool.OD === selectedSpecs.OD &&
      tool.LOC === selectedSpecs.LOC &&
      tool.SHK === selectedSpecs.SHK &&
      tool.OAL === selectedSpecs.OAL &&
      tool[selectedSpecs.flute] !== ''
    );
  };

  const handleAddToQuote = () => {
    const tool = getMatchingTool();
    if (!tool) return;

    const partNumber = tool[selectedSpecs.flute];
    const specs = `${tool.OD}" x ${tool.LOC}" - ${partNumber}`;
    
    onAddToQuote({
      id: partNumber,
      quantity: 1,
      specs
    });

    // Clear selections after adding to cart
    setSelectedSpecs({
      OD: '',
      LOC: '',
      SHK: '',
      OAL: '',
      flute: ''
    });
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="flex gap-8">
        {/* Left Side - Category Image and Subcategory List */}
        <div className="w-1/3">
          <div className="bg-zinc-800 rounded-2xl overflow-hidden mb-6">
            <img
              src="/src/components/images/cat1.png"
              alt="STANDARD ENDMILLS"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white">STANDARD ENDMILLS</h2>
              <p className="text-gray-400 mt-2">Standard precision end mills for general milling applications</p>
            </div>
          </div>

          {/* Subcategory List */}
          <div className="bg-zinc-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              {subcategories.map(subcat => (
                <button
                  key={subcat.id}
                  onClick={() => setSelectedSubcategory(subcat)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    selectedSubcategory.id === subcat.id
                      ? 'bg-yellow-500 text-zinc-900'
                      : 'text-gray-300 hover:bg-zinc-700'
                  }`}
                >
                  <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm text-left">{subcat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Selected Subcategory Content */}
        <div className="w-2/3">
          <div className="bg-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-2">{selectedSubcategory.name}</h2>
            <p className="text-gray-400 mb-6">{selectedSubcategory.description}</p>

            {/* Type Selection */}
            <div className="mb-8">
              <h3 className="text-gray-400 mb-3">Select Type:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedSubcategory.types.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedType?.id === type.id
                        ? 'bg-yellow-500 text-zinc-900'
                        : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Selection */}
            {selectedType && (
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400">OD</label>
                  <select 
                    value={selectedSpecs.OD}
                    onChange={(e) => handleSpecChange('OD', e.target.value)}
                    className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-3"
                  >
                    <option value="">Select OD</option>
                    {getAvailableValues('OD').map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400">LOC</label>
                  <select 
                    value={selectedSpecs.LOC}
                    onChange={(e) => handleSpecChange('LOC', e.target.value)}
                    className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-3"
                    disabled={!selectedSpecs.OD}
                  >
                    <option value="">Select LOC</option>
                    {getAvailableValues('LOC').map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400">SHK</label>
                  <select 
                    value={selectedSpecs.SHK}
                    onChange={(e) => handleSpecChange('SHK', e.target.value)}
                    className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-3"
                    disabled={!selectedSpecs.LOC}
                  >
                    <option value="">Select SHK</option>
                    {getAvailableValues('SHK').map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400">OAL</label>
                  <select 
                    value={selectedSpecs.OAL}
                    onChange={(e) => handleSpecChange('OAL', e.target.value)}
                    className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-3"
                    disabled={!selectedSpecs.SHK}
                  >
                    <option value="">Select OAL</option>
                    {getAvailableValues('OAL').map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>

                {selectedSpecs.OAL && (
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400">Flute Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['2-Flute', '3-Flute', '4 Flute', '2-Flute PowerA', '3- Flute PowerA', '4 Flute PowerA'].map(flute => {
                        const tool = toolData.find(t => 
                          t.OD === selectedSpecs.OD &&
                          t.LOC === selectedSpecs.LOC &&
                          t.SHK === selectedSpecs.SHK &&
                          t.OAL === selectedSpecs.OAL &&
                          t[flute] !== ''
                        );
                        
                        if (!tool) return null;

                        return (
                          <button
                            key={flute}
                            onClick={() => handleSpecChange('flute', flute)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              selectedSpecs.flute === flute
                                ? 'bg-yellow-500 text-zinc-900'
                                : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                            }`}
                          >
                            {flute}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleAddToQuote}
                  disabled={!selectedSpecs.flute}
                  className={`mt-6 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 w-full transition-all duration-300 ${
                    selectedSpecs.flute
                      ? 'bg-yellow-500 text-zinc-900 hover:bg-yellow-400'
                      : 'bg-zinc-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Quote
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardEndmills;
