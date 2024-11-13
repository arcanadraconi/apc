import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Product } from '../../types/catalog';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="group bg-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-700/80 transition-all duration-500 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 z-10"></div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block bg-yellow-500/20 text-yellow-500 text-xs font-semibold px-3 py-1 rounded-full">
            {product.subcategory}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{product.description}</p>
        </div>
        
        <div className="space-y-2">
          {Object.entries(product.specifications).map(([key, value]) => (
            value && (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-400">{key}:</span>
                <span className="text-gray-300">{value}</span>
              </div>
            )
          ))}
        </div>
        
        <div className="mt-6 flex gap-3">
          <button 
            onClick={onClick}
            className="flex-1 bg-zinc-700 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 group-hover:bg-yellow-500 group-hover:text-zinc-900 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add to Quote
          </button>
          <button 
            className="aspect-square bg-zinc-700 text-white p-2 rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-zinc-900 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;