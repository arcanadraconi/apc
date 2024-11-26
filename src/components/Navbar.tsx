import { useState, useEffect } from 'react';
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-zinc-900/95 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu and Logo */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="text-yellow-500 font-bold text-3xl">APC</span>
          </div>

          {/* Desktop Logo and Navigation */}
          <div className="hidden md:flex flex-1 items-center">
            <div className="flex-shrink-0">
              <button onClick={scrollToTop}>
                <img 
                  src={logo}
                  alt="APC Logo"
                  className="h-12 w-auto"
                />
              </button>
            </div>
            <div className="ml-10">
              <div className="flex items-baseline space-x-8">
                <button 
                  onClick={scrollToTop}
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-lg font-medium"
                >
                  Home
                </button>
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

          {/* Empty div to maintain spacing on mobile */}
          <div className="md:hidden w-10"></div>
        </div>

        {/* Mobile menu - Full screen overlay */}
        <div 
          className={`md:hidden fixed inset-0 bg-zinc-900/95 backdrop-blur-md transition-all duration-500 ease-in-out ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: '80px' }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button 
              onClick={() => {
                scrollToTop();
                setIsOpen(false);
              }}
              className="text-2xl text-gray-300 font-medium hover:text-yellow-500 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => {
                scrollToSection('catalogue-section');
                setIsOpen(false);
              }}
              className="text-2xl text-gray-300 font-medium hover:text-yellow-500 transition-colors"
            >
              Catalogue
            </button>
            <button 
              onClick={() => {
                scrollToSection('about-section');
                setIsOpen(false);
              }}
              className="text-2xl text-gray-300 font-medium hover:text-yellow-500 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => {
                scrollToSection('contact-section');
                setIsOpen(false);
              }}
              className="text-2xl text-gray-300 font-medium hover:text-yellow-500 transition-colors"
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
