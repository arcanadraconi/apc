import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  name: string;
  category: string;
  image: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, category, image, description }) => {
  return (
    <div className="group bg-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-700/80 transition-all duration-500 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 z-10"></div>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block bg-yellow-500/20 text-yellow-500 text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors">
          {name}
        </h3>
        <p className="text-gray-400 mt-2 text-sm">{description}</p>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-zinc-700 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 group-hover:bg-yellow-500 group-hover:text-zinc-900 transition-colors">
            <Plus className="h-4 w-4" /> Add to Quote
          </button>
          <button className="aspect-square bg-zinc-700 text-white p-2 rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-zinc-900 transition-colors">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;