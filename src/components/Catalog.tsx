import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, X, ShoppingCart } from 'lucide-react';
import { Category, Product, SubType } from '../types/catalog';
import { categories, products } from '../data/catalog';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'category'>('all');
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  const [quoteItems, setQuoteItems] = useState<Product[]>([]);

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

  const handleSpecChange = (specName: string, value: string) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [specName]: value
    }));
  };

  const getAvailableValues = (specName: string): string[] => {
    // If no specs are selected yet, return all unique values for the first spec (OD)
    if (Object.keys(selectedSpecs).length === 0 && specName === 'OD') {
      return Array.from(new Set(
        products
          .filter(p => p.subcategory === selectedSubcategory)
          .map(p => p.specifications.diameter)
      )).filter(Boolean) as string[];
    }

    // Filter products based on currently selected specs
    let filteredProducts = products.filter(product => {
      if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
      
      for (const [spec, value] of Object.entries(selectedSpecs)) {
        if (spec === specName) continue;
        if (product.specifications[spec as keyof typeof product.specifications] !== value) return false;
      }
      
      return true;
    });

    // Get unique values for the specified spec
    return Array.from(new Set(
      filteredProducts.map(p => {
        if (specName === 'OD') return p.specifications.diameter;
        if (specName === 'LOC') return p.specifications.lengthOfCut;
        if (specName === 'SHK') return p.specifications.shankDiameter;
        if (specName === 'OAL') return p.specifications.overallLength;
        return '';
      })
    )).filter(Boolean) as string[];
  };

  const getCurrentSubcategory = () => {
    if (!selectedCategory || !selectedSubcategory) return null;
    const category = categories.find(c => c.id === selectedCategory);
    return category?.subcategories.find(s => s.id === selectedSubcategory);
  };

  const getMatchingProduct = (): Product | null => {
    const subcategory = getCurrentSubcategory();
    if (!subcategory) return null;

    return products.find(product => {
      if (product.subcategory !== selectedSubcategory) return false;
      
      for (const [spec, value] of Object.entries(selectedSpecs)) {
        if (product.specifications[spec as keyof typeof product.specifications] !== value) return false;
      }
      
      return true;
    }) || null;
  };

  const handleAddToQuote = (product: Product) => {
    setQuoteItems(prev => [...prev, product]);
  };

  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
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
              className="bg-zinc-800 text-white border border-zinc-700 rounded-full px-6 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none cursor-pointer hover:bg-zinc-700 transition-colors"
              value={searchScope}
              onChange={(e) => setSearchScope(e.target.value as 'all' | 'category')}
            >
              <option value="all">All Products</option>
              <option value="category">Current Category</option>
            </select>
          </div>
        </div>

        {/* Views Container */}
        <div className="relative min-h-[700px]">
          {/* Category Grid View */}
          <div 
            className={`w-full transition-all duration-500 ease-in-out absolute ${
              selectedCategory 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-100 translate-x-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex flex-col rounded-2xl overflow-hidden hover:bg-zinc-700/80 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer h-full ${category.background}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 z-10"></div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 mt-2 text-sm flex-grow">{category.description}</p>
                    <button className="mt-4 text-yellow-500 flex items-center gap-2 group-hover:text-yellow-400 transition-colors duration-300 w-fit">
                      Browse Category <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Category View */}
          <div 
            className={`w-full transition-all duration-500 ease-in-out absolute ${
              selectedCategory 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            }`}
          >
            {selectedCategory && categories
              .filter(cat => cat.id === selectedCategory)
              .map(category => (
                <div key={category.id}>
                  {/* Back Button */}
                  <div className="flex justify-between mb-8">
                    <button
                      onClick={handleBackClick}
                      className="bg-yellow-500 text-zinc-900 px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      <X className="h-4 w-4" />
                      Back to Categories
                    </button>
                    {quoteItems.length > 0 && (
                      <button className="bg-yellow-500 text-zinc-900 px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300">
                        <ShoppingCart className="h-4 w-4" />
                        Quote ({quoteItems.length})
                      </button>
                    )}
                  </div>

                  <div className="flex gap-8">
                    {/* Category Info */}
                    <div className="w-1/3">
                      <div className="bg-zinc-800 rounded-2xl overflow-hidden sticky top-4">
                        <div className="relative h-64 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 z-10"></div>
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                          <p className="text-gray-400 mt-2 text-sm">{category.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Subcategories */}
                    <div className="w-2/3 space-y-4">
                      {category.subcategories.map(subcategory => (
                        <div 
                          key={subcategory.id} 
                          className={`bg-zinc-800 rounded-xl transform transition-all duration-300 ease-in-out hover:translate-x-2 ${
                            selectedSubcategory && selectedSubcategory !== subcategory.id ? 'hidden' : ''
                          }`}
                        >
                          <button
                            onClick={() => handleSubcategoryClick(subcategory.id)}
                            className="w-full flex items-center justify-between p-4 text-left text-gray-300 hover:text-yellow-500 transition-all duration-300 ease-in-out"
                          >
                            <span className="text-lg font-medium">{subcategory.name}</span>
                            <ChevronDown
                              className={`h-5 w-5 transform transition-transform duration-300 ease-in-out ${
                                selectedSubcategory === subcategory.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          {selectedSubcategory === subcategory.id && (
                            <div className="p-4 bg-zinc-700/30">
                              {/* SubTypes for Square End Mills */}
                              {subcategory.subTypes ? (
                                <div className="mb-6">
                                  <h4 className="text-white font-medium mb-3">Select Type:</h4>
                                  <div className="grid grid-cols-3 gap-4">
                                    {subcategory.subTypes.map(subType => (
                                      <button
                                        key={subType.id}
                                        onClick={() => handleSubTypeClick(subType.id)}
                                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
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
                              ) : null}

                              {/* Product Selection UI */}
                              <div className="space-y-4">
                                {subcategory.specifications.map(spec => {
                                  const availableValues = getAvailableValues(spec);
                                  const isDisabled = spec !== 'OD' && !selectedSpecs['OD'];

                                  return (
                                    <div key={spec} className="flex flex-col gap-2">
                                      <label className="text-sm font-medium text-gray-300">
                                        {spec}
                                      </label>
                                      <select
                                        value={selectedSpecs[spec] || ''}
                                        onChange={(e) => handleSpecChange(spec, e.target.value)}
                                        disabled={isDisabled}
                                        className={`bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
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
                              </div>

                              {/* Quote Button */}
                              {getMatchingProduct() && (
                                <button
                                  onClick={() => {
                                    const product = getMatchingProduct();
                                    if (product) handleAddToQuote(product);
                                  }}
                                  className="mt-6 bg-yellow-500 text-zinc-900 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300"
                                >
                                  <ShoppingCart className="h-4 w-4" />
                                  Add to Quote
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
