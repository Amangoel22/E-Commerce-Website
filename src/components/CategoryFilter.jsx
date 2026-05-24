import { categories } from '../data/products'
import * as LucideIcons from 'lucide-react'

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 px-4 py-3 md:px-6 mx-auto max-w-7xl">
        {categories.map((category) => {
          const IconComponent = LucideIcons[category.icon]
          const isActive = activeCategory === category.id

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap border ${
                isActive
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-background text-foreground border-border hover:border-accent'
              }`}
            >
              {IconComponent && <IconComponent size={16} />}
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
