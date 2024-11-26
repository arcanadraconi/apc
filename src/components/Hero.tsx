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
      <div className="relative mt-60 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-30 pb-10">
        <div className="text-center">
          <img 
            src={logo} 
            alt="APC Logo" 
            className="h-60 w-auto mx-auto mb-2"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Advanced Precision <br />
            <span className="text-yellow-500">Cutting Tools</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            High-performance cutting tools engineered for precision machining and superior results
          </p>
          <button 
            onClick={scrollToCatalog}
            className="bg-yellow-500 text-zinc-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-colors"
          >
            Explore Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
