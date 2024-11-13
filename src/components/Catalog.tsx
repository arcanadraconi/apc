import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Category, Product } from '../types/catalog';
import { categories, products } from '../data/catalog';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'category'>('all');

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setExpandedSubcategories([]);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setExpandedSubcategories([]);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories(prev => 
      prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  return (
    <section className="bg-zinc-900/95 min-h-screen pb-96">
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
        <div className="relative min-h-[700px] mb-60">
          {/* Category Grid View */}
          <div 
            className={`w-full transition-all duration-500 ease-in-out absolute ${
              selectedCategory 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-100 translate-x-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col bg-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-700/80 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer h-full"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
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
                  <div className="flex justify-end mb-8">
                    <button
                      onClick={handleBackClick}
                      className="bg-yellow-500 text-zinc-900 px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      <X className="h-4 w-4" />
                      Back to Categories
                    </button>
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
                          className="bg-zinc-800 rounded-xl transform transition-all duration-300 ease-in-out hover:translate-x-2"
                        >
                          <button
                            onClick={() => toggleSubcategory(subcategory.id)}
                            className="w-full flex items-center justify-between p-4 text-left text-gray-300 hover:text-yellow-500 transition-all duration-300 ease-in-out"
                          >
                            <span className="text-lg font-medium">{subcategory.name}</span>
                            <ChevronDown
                              className={`h-5 w-5 transform transition-transform duration-300 ease-in-out ${
                                expandedSubcategories.includes(subcategory.id) ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${
                              expandedSubcategories.includes(subcategory.id)
                                ? 'max-h-[800px] opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="p-4 bg-zinc-700/30">
                              <p className="text-gray-400 mb-4">{subcategory.description}</p>
                              <div className="grid grid-cols-2 gap-4">
                                {subcategory.specifications.map((spec, index) => (
                                  <div key={index} className="text-sm text-gray-400">• {spec}</div>
                                ))}
                              </div>
                            </div>
                          </div>
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
