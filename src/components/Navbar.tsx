import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from './apclogo.png';

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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-zinc-900/95 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img 
                  src={logo}
                  alt="APC Logo"
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-lg font-medium"
                >
                  Home
                </Link>
                <button 
                  onClick={() => scrollToSection('catalogue-section')}
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-lg font-medium"
                >
                  Catalogue
                </button>
                <button 
                  onClick={() => scrollToSection('about-section')}
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-lg font-medium"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact-section')}
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-lg font-medium"
                >
                  Contact
                </button>
              </div>
            </div>
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
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-300 font-medium hover:text-yellow-500"
            >
              Home
            </Link>
            <button 
              onClick={() => {
                scrollToSection('catalogue-section');
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-500"
            >
              Catalogue
            </button>
            <button 
              onClick={() => {
                scrollToSection('about-section');
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-500"
            >
              About
            </button>
            <button 
              onClick={() => {
                scrollToSection('contact-section');
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-500"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
