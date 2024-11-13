import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-zinc-900/95 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                src="https://i.ibb.co/DpdvBpM/lightspiritux-httpss-mj-runi-Ba-VFsk-Gqag-httpss-mj-run-EUbpbjk-P8o-Q-1be2fd27-b9e8-4cfc-aedc-e1aa97.png"
                alt="PrecisionBits Logo"
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <a href="#" className="text-yellow-500 font-medium hover:text-yellow-400 transition-colors">Home</a>
                <a href="#catalog" className="text-gray-300 hover:text-yellow-500 transition-colors">Catalog</a>
                <a href="#about" className="text-gray-300 hover:text-yellow-500 transition-colors">About Us</a>
                <a href="#contact" className="text-gray-300 hover:text-yellow-500 transition-colors">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-300 hover:text-yellow-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-300 hover:text-yellow-500 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <a href="#contact" className="bg-yellow-500 text-zinc-900 px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors">
              Get Quote
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-yellow-500 font-medium">Home</a>
            <a href="#catalog" className="block px-3 py-2 text-gray-300 hover:text-yellow-500">Catalog</a>
            <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-yellow-500">About Us</a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-yellow-500">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;