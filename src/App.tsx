import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Contact from './components/Contact';

function App() {
  const [catalogExpanded, setCatalogExpanded] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-zinc-900">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="relative z-10 overflow-y-hidden">
                <Catalog onExpandChange={setCatalogExpanded} />
              </div>  
              <div className={`relative z-10 transition-all duration-500 ease-in-out transform ${
                catalogExpanded ? 'translate-y-[800px]' : 'translate-y-0'
              }`}>
                <Contact />
              </div>
            </>
          } />
          <Route path="/catalog" element={
            <div className="relative z-10">
              <Catalog onExpandChange={setCatalogExpanded} />
            </div>
          } />
          <Route path="/contact" element={
            <div className="relative z-10">
              <Contact />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
