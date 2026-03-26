'use client';

interface CategoryFilterProps {
  filter: 'all' | 'residential' | 'commercial';
  showFeaturedOnly: boolean;
  onFilterChange: (filter: 'all' | 'residential' | 'commercial') => void;
  onFeaturedToggle: (showFeatured: boolean) => void;
}

const CategoryFilter = ({ 
  filter, 
  showFeaturedOnly, 
  onFilterChange, 
  onFeaturedToggle 
}: CategoryFilterProps) => {
  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onFilterChange(category.value as typeof filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              filter === category.value
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={showFeaturedOnly}
          onChange={(e) => onFeaturedToggle(e.target.checked)}
          className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
        />
        <span className="text-sm text-gray-700">Featured only</span>
      </label>
    </div>
  );
};

export default CategoryFilter;
