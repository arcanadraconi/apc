import React, { useState } from 'react';
import { ChevronDown, ShoppingCart, X } from 'lucide-react';
import { categories } from '../../data/catalog';
import { Product } from '../../types/catalog';

const CarbideBurrs = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  const [quoteItems, setQuoteItems] = useState<Product[]>([]);

  const category = categories.find(c => c.id === 'carbide-burrs');
  if (!category) return null;

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategory(selectedSubcategory === subcategoryId ? null : subcategoryId);
    setSelectedSubType(null);
    setSelectedSpecs({});
  };

  const handleSubTypeClick = (subTypeId: string) => {
    setSelectedSubType(subTypeId);
    setSelectedSpecs({});
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLSelectElement>, specName: string) => {
    e.preventDefault();
    const value = e.target.value;
    setSelectedSpecs(prev => ({
      ...prev,
      [specName]: value
    }));
  };

  return (
    <div className="w-full">
      <div className="bg-zinc-800 rounded-2xl overflow-hidden mb-8">
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 z-10"></div>
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-2">{category.name}</h2>
          <p className="text-gray-400">{category.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {category.subcategories.map(subcategory => (
          <div 
            key={subcategory.id} 
            className={`bg-zinc-800 rounded-xl transform transition-all duration-500 ease-in-out hover:translate-x-2 ${
              selectedSubcategory === subcategory.id ? 'ring-2 ring-yellow-500' : ''
            }`}
          >
            <button
              onClick={() => handleSubcategoryClick(subcategory.id)}
              className="w-full flex items-center justify-between p-4 text-left text-gray-300 hover:text-yellow-500 transition-all duration-300 ease-in-out"
            >
              <span className="text-lg font-medium">{subcategory.name}</span>
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-500 ease-in-out ${
                  selectedSubcategory === subcategory.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                selectedSubcategory === subcategory.id 
                  ? 'max-h-[1000px] opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 bg-zinc-700/30">
                {subcategory.subTypes && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Select Type:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subcategory.subTypes.map(subType => (
                        <button
                          key={subType.id}
                          onClick={() => handleSubTypeClick(subType.id)}
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
                    {subcategory.specifications.map(spec => (
                      <div key={spec} className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-300">
                          {spec}
                        </label>
                        <select
                          value={selectedSpecs[spec] || ''}
                          onChange={(e) => handleSpecChange(e, spec)}
                          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                          <option value="">Select {spec}</option>
                          {/* Add options based on available values */}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarbideBurrs;
