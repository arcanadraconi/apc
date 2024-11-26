import { Trash2, Send } from 'lucide-react';
import { QuoteItem } from '../../types/catalog';

interface QuoteBuilderProps {
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onSubmitQuote: () => void;
}

const QuoteBuilder: React.FC<QuoteBuilderProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitQuote,
}) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Quote Request</h3>
      
      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No items added to quote yet
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-zinc-700 p-3 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">
                  Part #{item.id}
                </h4>
                <p className="text-sm text-gray-400 truncate">
                  {item.specs}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                  className="w-20 bg-zinc-600 border border-zinc-500 rounded px-2 py-1 text-white"
                />
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 hover:bg-zinc-600 rounded-full transition-colors"
                >
                  <Trash2 className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={onSubmitQuote}
            className="w-full mt-6 bg-yellow-500 text-zinc-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center"
          >
            <Send className="h-5 w-5 mr-2" />
            Submit Quote Request
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteBuilder;
