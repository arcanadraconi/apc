import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { X, ShoppingCart } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import StandardEndmills from './components/categories/StandardEndmills';
import HighPerformanceEndmills from './components/categories/HighPerformanceEndmills';
import SpecialtyEndmills from './components/categories/SpecialtyEndmills';
import RoughingEndmills from './components/categories/RoughingEndmills';
import ThreadMills from './components/categories/ThreadMills';
import MicroEndmills from './components/categories/MicroEndmills';
import CarbideBurrs from './components/categories/CarbideBurrs';
import CustomSolutions from './components/categories/CustomSolutions';
import { categories } from './data/catalog';
import { ChevronRight } from 'lucide-react';

interface QuoteItem {
  id: string;
  quantity: number;
  specs: string;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const handleAddToQuote = (item: QuoteItem) => {
    setQuoteItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const getTotalQuantity = () => {
    return quoteItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCategoryComponent = (categoryId: string) => {
    switch (categoryId) {
      case 'standard-endmills':
        return <StandardEndmills onAddToQuote={handleAddToQuote} />;
      case 'high-performance-endmills':
        return <HighPerformanceEndmills onAddToQuote={handleAddToQuote} />;
      case 'specialty-endmills':
        return <SpecialtyEndmills onAddToQuote={handleAddToQuote} />;
      case 'roughing-endmills':
        return <RoughingEndmills onAddToQuote={handleAddToQuote} />;
      case 'thread-mills':
        return <ThreadMills onAddToQuote={handleAddToQuote} />;
      case 'micro-endmills':
        return <MicroEndmills onAddToQuote={handleAddToQuote} />;
      case 'carbide-burrs':
        return <CarbideBurrs onAddToQuote={handleAddToQuote} />;
      case 'custom-solutions':
        return <CustomSolutions onAddToQuote={handleAddToQuote} />;
      default:
        return null;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-zinc-900">
        <Navbar />

        {/* Quote Counter */}
        <div className="fixed top-6 right-8 z-50">
          <button className="bg-yellow-500 text-zinc-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Quote ({getTotalQuantity()})
          </button>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              {/* Catalogue Section */}
              <div id="catalogue-section" className="relative min-h-[900px]">
                {/* Grid view of all categories */}
                <div 
                  className={`w-full transition-all duration-700 ease-in-out absolute ${
                    selectedCategory ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'
                  }`}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            <button className="mt-4 text-yellow-500 flex items-center gap-2 hover:text-yellow-400 transition-colors duration-300 w-fit">
                              Browse Category <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected category view */}
                {selectedCategory && (
                  <div className="w-full transition-all duration-700 ease-in-out absolute opacity-100 translate-x-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                      <button 
                        onClick={handleBackClick} 
                        className="mb-8 bg-yellow-500 text-zinc-900 px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300"
                      >
                        <X className="h-4 w-4" />
                        Back to Categories
                      </button>

                      {getCategoryComponent(selectedCategory)}
                    </div>
                  </div>
                )}
              </div>

              {/* About Section */}
              <div id="about-section" className="py-20 bg-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-white mb-8">About Us</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-500 mb-4">Our Mission</h3>
                      <p className="text-gray-300 leading-relaxed">
                        To provide precision cutting tools of uncompromising quality, enabling manufacturers to achieve excellence in their machining operations. We are committed to innovation, precision, and customer success.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-500 mb-4">Our Vision</h3>
                      <p className="text-gray-300 leading-relaxed">
                        To be the industry leader in high-performance cutting tools, recognized globally for our commitment to quality, innovation, and customer service. We strive to advance manufacturing capabilities through cutting-edge tooling solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div id="contact-section">
                <Contact />
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
