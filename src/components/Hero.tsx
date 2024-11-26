import heroImage from './hero.png';
import logo from './apclogo.png';

const Hero = () => {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalogue-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-zinc-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-25"
        />
      </div>

      {/* Dots Pattern Overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 min-h-screen flex flex-col justify-center">
        <div className="text-center">
          <img 
            src={logo} 
            alt="APC Logo" 
            className="h-48 sm:h-56 md:h-64 w-auto mx-auto mb-6 transform transition-all duration-700 hover:scale-105"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700">
            Advanced Precision <br />
            <span className="text-yellow-500">Cutting Tools</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-700">
            High-performance cutting tools engineered for precision machining and superior results
          </p>
          <button 
            onClick={scrollToCatalog}
            className="bg-yellow-500 text-zinc-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Explore Products
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="w-1 h-8 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
