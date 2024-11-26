import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ComponentProps } from '../../types/catalog';
import categoryImage from '../images/cat7.png';

interface ToolData {
  OD: string;
  LOC: string;
  SHK: string;
  OAL: string;
  'PowerA No Flat': string;
  'PowerA With Flat': string;
  [key: string]: string;
}

const subcategories = [
  {
    id: 'cylindrical-burrs',
    name: 'CYLINDRICAL BURRS',
    description: 'Cylindrical shaped carbide burrs',
    types: [
      {
        id: 'metric-cylindrical-burr',
        name: 'Metric Cylindrical Burrs',
        description: 'Metric dimensioned cylindrical burrs',
        csvFile: 'MET Cylindrical Burrs.csv'
      }
    ]
  }
];

const CarbideBurrs: React.FC<ComponentProps> = ({ onAddToQuote }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<{
    id: string;
    name: string;
    description: string;
    csvFile: string;
  } | null>(null);
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
    if (selectedSubType) {
      fetch(`/csv_data/${selectedSubType.csvFile}`)
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
          setSelectedSpecs({
            OD: '',
            LOC: '',
            SHK: '',
            OAL: '',
            variant: ''
          });
        });
    }
  }, [selectedSubType]);

  const getAvailableValues = (field: keyof typeof selectedSpecs) => {
    if (!toolData.length) return [];

    let filteredData = toolData;

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

    if (field === 'variant') {
      return ['PowerA No Flat', 'PowerA With Flat'];
    }

    return Array.from(new Set(filteredData.map(item => item[field as keyof ToolData])))
      .filter(Boolean)
      .sort();
  };

  const handleSpecChange = (field: keyof typeof selectedSpecs, value: string) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [field]: value,
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
              alt="CARBIDE BURRS"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white">CARBIDE BURRS</h2>
              <p className="text-gray-400 mt-2">Rotary cutting tools for deburring and surface finishing</p>
            </div>
          </div>
        </div>

        {/* Right Side - Subcategories */}
        <div className="w-2/3 space-y-4">
          {subcategories.map(subcategory => (
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
                  {subcategory.types && (
                    <div className="mb-6">
                      <p className="text-gray-400 mb-3">Select Type:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subcategory.types.map(type => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedSubType(selectedSubType?.id === type.id ? null : type)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                              selectedSubType?.id === type.id
                                ? 'bg-yellow-500 text-zinc-900'
                                : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                            }`}
                          >
                            {type.name}
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

export default CarbideBurrs;
