'use client';

interface CategoryFilterProps {
  filter: 'all' | 'residential' | 'commercial';
  showFeaturedOnly: boolean;
  onFilterChange: (filter: 'all' | 'residential' | 'commercial') => void;
  onFeaturedToggle: (value: boolean) => void;
}

const CATEGORIES: { label: string; value: 'all' | 'residential' | 'commercial' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
];

const CategoryFilter = ({
  filter,
  showFeaturedOnly,
  onFilterChange,
  onFeaturedToggle,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={showFeaturedOnly}
            onChange={(e) => onFeaturedToggle(e.target.checked)}
          />
          <div
            className={`w-10 h-6 rounded-full transition-colors duration-200 ${
              showFeaturedOnly ? 'bg-gray-900' : 'bg-gray-300'
            }`}
          />
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
              showFeaturedOnly ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">Featured only</span>
      </label>
    </div>
  );
};

export default CategoryFilter;
