interface CategoryProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Category({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryProps) {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0
              ${
                isActive
                  ? "bg-gray-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-white text-gray-700 border border-gray-400 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}