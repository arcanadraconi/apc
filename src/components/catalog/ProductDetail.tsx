import React from 'react';
import { X, Download, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/catalog';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToQuote,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-900 p-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.technicalDrawing && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-white mb-2">Technical Drawing</h3>
                  <img
                    src={product.technicalDrawing}
                    alt="Technical Drawing"
                    className="w-full"
                  />
                  <button className="mt-2 flex items-center text-yellow-500 hover:text-yellow-400">
                    <Download className="h-4 w-4 mr-2" />
                    Download Technical Drawing
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Specifications</h3>
                <div className="bg-zinc-800 rounded-lg p-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex justify-between py-2 border-b border-zinc-700 last:border-0">
                        <span className="text-gray-400">{key}:</span>
                        <span className="text-gray-300">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              
              {product.notes && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Notes</h3>
                  <p className="text-gray-400">{product.notes}</p>
                </div>
              )}
              
              <button
                onClick={() => onAddToQuote(product)}
                className="w-full bg-yellow-500 text-zinc-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Quote Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;