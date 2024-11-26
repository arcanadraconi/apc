import { ChevronRight } from 'lucide-react';
import { Category, Subcategory } from '../../types/catalog';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  selectedSubcategory: string;
  onCategorySelect: (categoryId: string) => void;
  onSubcategorySelect: (subcategoryId: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect,
}) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => onCategorySelect(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                selectedCategory === category.id
                  ? 'bg-yellow-500 text-zinc-900'
                  : 'text-gray-300 hover:bg-zinc-700'
              }`}
            >
              <span>{category.name}</span>
              <ChevronRight className={`h-4 w-4 transform transition-transform ${
                selectedCategory === category.id ? 'rotate-90' : ''
              }`} />
            </button>
            
            {selectedCategory === category.id && (
              <div className="ml-4 mt-2 space-y-1">
                {category.subcategories.map((subcategory: Subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => onSubcategorySelect(subcategory.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-md ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'text-gray-400 hover:bg-zinc-700'
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
