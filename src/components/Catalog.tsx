import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, X, ShoppingCart } from 'lucide-react';
import { Product, SubType } from '../types/catalog';
import { categories, products } from '../data/catalog';

interface CatalogProps {
  onAddToQuote: (item: { id: string; quantity: number; specs: string }) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAddToQuote }) => {
  // ... rest of the component code stays exactly the same ...
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'category'>('all');
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (selectedSubType) {
      const filtered = getFilteredProducts();
      setFilteredProducts(filtered);
    }
  }, [selectedSubType, selectedSubcategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSelectedSubType(null);
    setSelectedSpecs({});
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedSubType(null);
    setSelectedSpecs({});
  };

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
      [specName]: value,
      ...(specName === 'OD' && { LOC: '', SHK: '', OAL: '', variant: '' }),
      ...(specName === 'LOC' && { SHK: '', OAL: '', variant: '' }),
      ...(specName === 'SHK' && { OAL: '', variant: '' }),
      ...(specName === 'OAL' && { variant: '' })
    }));
  };

  const compareFractions = (a: string, b: string): number => {
    const toDecimal = (str: string): number => {
      if (str.includes('-')) {
        const [whole, fraction] = str.split('-');
        const [num, den] = fraction.split('/').map(Number);
        return Number(whole) + (num / den);
      }
      if (str.includes('/')) {
        const [num, den] = str.split('/').map(Number);
        return num / den;
      }
      return Number(str);
    };

    return toDecimal(a) - toDecimal(b);
  };

  const getFilteredProducts = () => {
    const subType = getCurrentSubType();
    if (!subType) return [];

    let filtered = products.filter(product => {
      if (product.subcategory !== selectedSubcategory) return false;

      switch (subType.dimensionType) {
        case 'fractional':
          return product.specifications.diameter.includes('/') || product.specifications.diameter.includes('-');
        case 'metric':
          return !isNaN(Number(product.specifications.diameter));
        case 'extra-long':
          const loc = product.specifications.lengthOfCut;
          const od = product.specifications.diameter;
          const ratio = compareFractions(loc, od);
          return ratio >= 4;
        default:
          return true;
      }
    });

    filtered.sort((a, b) => 
      compareFractions(a.specifications.diameter, b.specifications.diameter)
    );

    return filtered;
  };

  const getAvailableValues = (field: keyof typeof selectedSpecs) => {
    if (!filteredProducts.length) return [];
    
    let values: string[] = [];
    
    switch (field) {
      case 'OD':
        values = filteredProducts.map(p => p.specifications.diameter);
        break;
      case 'LOC':
        if (!selectedSpecs.OD) return [];
        values = filteredProducts
          .filter(p => p.specifications.diameter === selectedSpecs.OD)
          .map(p => p.specifications.lengthOfCut);
        break;
      case 'SHK':
        if (!selectedSpecs.LOC) return [];
        values = filteredProducts
          .filter(p => 
            p.specifications.diameter === selectedSpecs.OD &&
            p.specifications.lengthOfCut === selectedSpecs.LOC
          )
          .map(p => p.specifications.shankDiameter);
        break;
      case 'OAL':
        if (!selectedSpecs.SHK) return [];
        values = filteredProducts
          .filter(p => 
            p.specifications.diameter === selectedSpecs.OD &&
            p.specifications.lengthOfCut === selectedSpecs.LOC &&
            p.specifications.shankDiameter === selectedSpecs.SHK
          )
          .map(p => p.specifications.overallLength);
        break;
    }

    return Array.from(new Set(values)).sort((a, b) => compareFractions(a, b));
  };

  const getCurrentSubType = (): SubType | null => {
    if (!selectedCategory || !selectedSubcategory || !selectedSubType) return null;
    const category = categories.find(c => c.id === selectedCategory);
    const subcategory = category?.subcategories.find(s => s.id === selectedSubcategory);
    return subcategory?.subTypes?.find(st => st.id === selectedSubType) || null;
  };

  const getMatchingProduct = (): Product | null => {
    if (!selectedSpecs.OD || !selectedSpecs.LOC || !selectedSpecs.SHK || !selectedSpecs.OAL) {
      return null;
    }

    return filteredProducts.find(product => 
      product.specifications.diameter === selectedSpecs.OD &&
      product.specifications.lengthOfCut === selectedSpecs.LOC &&
      product.specifications.shankDiameter === selectedSpecs.SHK &&
      product.specifications.overallLength === selectedSpecs.OAL
    ) || null;
  };

  const handleAddToQuote = (product: Product) => {
    onAddToQuote({
      id: product.id,
      quantity: 1,
      specs: `${product.specifications.diameter}" x ${product.specifications.lengthOfCut}"`
    });
  };

  return (
    <section id="catalogue-section" className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search precision tools..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              className="w-full sm:w-auto bg-zinc-800 text-white border border-zinc-700 rounded-full px-6 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none cursor-pointer hover:bg-zinc-700 transition-colors"
              value={searchScope}
              onChange={(e) => setSearchScope(e.target.value as 'all' | 'category')}
            >
              <option value="all">All Products</option>
              <option value="category">Current Category</option>
            </select>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="relative min-h-[700px]">
          <div 
            className={`w-full transition-all duration-700 ease-in-out absolute ${
              selectedCategory ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex flex-col rounded-2xl overflow-hidden hover:bg-zinc-700/80 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer h-full ${category.background}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 z-10"></div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 mt-2 text-sm flex-grow">{category.description}</p>
                    <button className="mt-4 bg-yellow-500 text-zinc-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300 w-fit">
                      Browse Category <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Category View */}
          <div 
            className={`w-full transition-all duration-700 ease-in-out absolute ${
              selectedCategory ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            {selectedCategory && (
              <div className="space-y-6">
                {/* Back Button */}
                <button
                  onClick={handleBackClick}
                  className="w-full bg-yellow-500 text-zinc-900 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all duration-300"
                >
                  <X className="h-5 w-5" />
                  Back to Categories
                </button>

                {categories
                  .filter(cat => cat.id === selectedCategory)
                  .map(category => (
                    <div key={category.id} className="space-y-6">
                      {/* Category Card */}
                      <div className="bg-zinc-800 rounded-2xl overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 z-10"></div>
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                          <p className="text-gray-400 mt-2">{category.description}</p>
                        </div>
                      </div>

                      {/* Subcategories List */}
                      <div className="space-y-4">
                        {category.subcategories.map(subcategory => (
                          <div 
                            key={subcategory.id} 
                            className={`bg-zinc-800 rounded-xl transition-all duration-500 ${
                              selectedSubcategory === subcategory.id ? 'ring-2 ring-yellow-500' : ''
                            }`}
                          >
                            <button
                              onClick={() => handleSubcategoryClick(subcategory.id)}
                              className="w-full flex items-center justify-between p-4 text-left text-gray-300 hover:text-yellow-500 transition-colors"
                            >
                              <span className="text-lg font-medium">{subcategory.name}</span>
                              <ChevronDown
                                className={`h-5 w-5 transform transition-transform duration-500 ${
                                  selectedSubcategory === subcategory.id ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            
                            <div 
                              className={`transition-all duration-500 overflow-hidden ${
                                selectedSubcategory === subcategory.id 
                                  ? 'max-h-[2000px] opacity-100' 
                                  : 'max-h-0 opacity-0'
                              }`}
                            >
                              <div className="p-4 bg-zinc-700/30">
                                {subcategory.subTypes && (
                                  <div className="mb-6">
                                    <h4 className="text-white font-medium mb-3">Select Type:</h4>
                                    <div className="flex flex-col gap-2">
                                      {subcategory.subTypes.map(subType => (
                                        <button
                                          key={subType.id}
                                          onClick={() => handleSubTypeClick(subType.id)}
                                          className={`p-4 rounded-lg text-base font-medium transition-all duration-300 ${
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
                                    {getCurrentSubType()?.specifications.map(spec => {
                                      const availableValues = getAvailableValues(spec);
                                      const isDisabled = spec !== 'OD' && !selectedSpecs['OD'];

                                      return (
                                        <div key={spec} className="flex flex-col gap-2">
                                          <label className="text-sm font-medium text-gray-300">
                                            {spec}
                                          </label>
                                          <select
                                            value={selectedSpecs[spec] || ''}
                                            onChange={(e) => handleSpecChange(e, spec)}
                                            disabled={isDisabled}
                                            className={`w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                                              isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-700'
                                            }`}
                                          >
                                            <option value="">Select {spec}</option>
                                            {availableValues.map(value => (
                                              <option key={value} value={value}>
                                                {value}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      );
                                    })}

                                    {getMatchingProduct() && (
                                      <button
                                        onClick={() => {
                                          const product = getMatchingProduct();
                                          if (product) handleAddToQuote(product);
                                        }}
                                        className="w-full bg-yellow-500 text-zinc-900 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all duration-300"
                                      >
                                        <ShoppingCart className="h-4 w-4" />
                                        Add to Quote
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
