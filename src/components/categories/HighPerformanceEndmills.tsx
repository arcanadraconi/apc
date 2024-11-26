import { useState, useEffect } from 'react';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import categoryImage from '../images/cat2.png';
import { ToolData, HighPerformanceEndmillsProps } from '../../types/catalog';

const category = {
  id: 'high-performance-endmills',
  name: 'HIGH PERFORMANCE ENDMILLS',
  description: 'Advanced end mills for high-speed and demanding applications',
  subcategories: [
    {
      id: 'v4-endmills',
      name: 'V4 END MILLS',
      description: 'High performance V4 series end mills',
      subTypes: [
        {
          id: 'v4-square',
          name: 'V4 Square End Mills',
          description: 'V4 series square end mills'
        },
        {
          id: 'v4-ball',
          name: 'V4 Ball End Mills',
          description: 'V4 series ball end mills'
        },
        {
          id: 'v4-corner-radius',
          name: 'V4 Corner Radius End Mills',
          description: 'V4 series corner radius end mills'
        }
      ]
    },
    {
      id: 'v5-endmills',
      name: 'V5 END MILLS',
      description: 'High performance V5 series end mills',
      subTypes: [
        {
          id: 'v5-square',
          name: 'V5 Square End Mills',
          description: 'V5 series square end mills'
        },
        {
          id: 'v5-ball',
          name: 'V5 Ball End Mills',
          description: 'V5 series ball end mills'
        },
        {
          id: 'v5-corner-radius',
          name: 'V5 Corner Radius End Mills',
          description: 'V5 series corner radius end mills'
        }
      ]
    }
  ]
};

const HighPerformanceEndmills: React.FC<HighPerformanceEndmillsProps> = ({ onAddToQuote }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [toolData, setToolData] = useState<ToolData[]>([]);
  const [selectedSpecs, setSelectedSpecs] = useState<{
    OD: string;
    LOC: string;
    SHK: string;
    OAL: string;
    variant: string;
  }>({
    OD: '',
    LOC: '',
    SHK: '',
    OAL: '',
    variant: ''
  });

  useEffect(() => {
    // Load the appropriate CSV file based on selected subtype
    if (selectedSubType) {
      let csvFile = '';
      if (selectedSubType === 'v4-square') {
        csvFile = '/csv_data/highendmills/FRT V4 Square Endmills.csv';
      } else if (selectedSubType === 'v4-ball') {
        csvFile = '/csv_data/highendmills/FRT V4 Ball Endmills.csv';
      } else if (selectedSubType === 'v4-corner-radius') {
        csvFile = '/csv_data/highendmills/FRT - V4 Corner Radius.csv';
      } else if (selectedSubType === 'v5-square') {
        csvFile = '/csv_data/highendmills/FRT V5 Square End.csv';
      } else if (selectedSubType === 'v5-ball') {
        csvFile = '/csv_data/highendmills/FRT V5 Ball Endmills.csv';
      } else if (selectedSubType === 'v5-corner-radius') {
        csvFile = '/csv_data/highendmills/FRT V5 Corner Radius.csv';
      }

      if (csvFile) {
        fetch(csvFile)
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
                'PowerA No Flat': values[4],
                'PowerA With Flat': values[5]
              };
            });
            setToolData(data);
          });
      }
    }
  }, [selectedSubType]);

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
    if (field === 'variant') {
      return ['PowerA No Flat', 'PowerA With Flat'];
    }

    const values = Array.from(new Set(filteredData.map(item => item[field])));
    return values;
  };

  const handleSpecChange = (field: keyof typeof selectedSpecs, value: string) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [field]: value,
      // Clear subsequent fields
      ...(field === 'OD' && { LOC: '', SHK: '', OAL: '', variant: '' }),
      ...(field === 'LOC' && { SHK: '', OAL: '', variant: '' }),
      ...(field === 'SHK' && { OAL: '', variant: '' }),
      ...(field === 'OAL' && { variant: '' })
    }));
  };

  const getMatchingTool = () => {
    if (!selectedSpecs.OD || !selectedSpecs.LOC || !selectedSpecs.SHK || !selectedSpecs.OAL || !selectedSpecs.variant) {
      return null;
    }

    return toolData.find(tool => 
      tool.OD === selectedSpecs.OD &&
      tool.LOC === selectedSpecs.LOC &&
      tool.SHK === selectedSpecs.SHK &&
      tool.OAL === selectedSpecs.OAL &&
      tool[selectedSpecs.variant] !== ''
    );
  };

  const handleAddToQuote = () => {
    const tool = getMatchingTool();
    if (!tool) return;

    const partNumber = tool[selectedSpecs.variant];
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
      variant: ''
    });
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="flex gap-8">
        {/* Left Side - Category Image */}
        <div className="w-1/3">
          <div className="bg-zinc-800 rounded-2xl overflow-hidden">
            <img
              src={categoryImage}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white">{category.name}</h2>
              <p className="text-gray-400 mt-2">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Subcategories */}
        <div className="w-2/3 space-y-4">
          {category.subcategories.map(subcategory => (
            <div 
              key={subcategory.id} 
              className={`bg-zinc-800 rounded-xl transform transition-all duration-500 ease-in-out hover:translate-x-2 ${
                selectedSubcategory === subcategory.id ? 'ring-2 ring-yellow-500' : ''
              }`}
            >
              <button
                onClick={() => setSelectedSubcategory(
                  selectedSubcategory === subcategory.id ? null : subcategory.id
                )}
                className="w-full flex items-center justify-between p-4 text-left text-gray-300 hover:text-yellow-500 transition-all duration-300"
              >
                <span className="text-lg font-medium">{subcategory.name}</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-500 ${
                    selectedSubcategory === subcategory.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  selectedSubcategory === subcategory.id 
                    ? 'max-h-[2000px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 bg-zinc-700/30">
                  {subcategory.subTypes && (
                    <div className="mb-6">
                      <p className="text-gray-400 mb-3">Select Type:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subcategory.subTypes.map(subType => (
                          <button
                            key={subType.id}
                            onClick={() => setSelectedSubType(selectedSubType === subType.id ? null : subType.id)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                              selectedSubType === subType.id
                                ? 'bg-yellow-500 text-zinc-900'
                                : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                            }`}
                          >
                            {subType.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSubType && (
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
                          <label className="text-gray-400">Variant</label>
                          <div className="grid grid-cols-2 gap-4">
                            {['PowerA No Flat', 'PowerA With Flat'].map(variant => {
                              const tool = toolData.find(t => 
                                t.OD === selectedSpecs.OD &&
                                t.LOC === selectedSpecs.LOC &&
                                t.SHK === selectedSpecs.SHK &&
                                t.OAL === selectedSpecs.OAL &&
                                t[variant] !== ''
                              );
                              
                              if (!tool) return null;

                              return (
                                <button
                                  key={variant}
                                  onClick={() => handleSpecChange('variant', variant)}
                                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    selectedSpecs.variant === variant
                                      ? 'bg-yellow-500 text-zinc-900'
                                      : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                                  }`}
                                >
                                  {variant}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={handleAddToQuote}
                        disabled={!selectedSpecs.variant}
                        className={`mt-6 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 w-full transition-all duration-300 ${
                          selectedSpecs.variant
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighPerformanceEndmills;
