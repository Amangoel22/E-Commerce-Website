import { Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="group flex flex-col gap-3 transition-all duration-200 h-full p-4 border border-border rounded-lg hover:shadow-xl hover:border-accent cursor-pointer bg-card hover:bg-muted/50">
        <div className="relative aspect-square overflow-hidden bg-secondary rounded-lg border border-border flex items-center justify-center transition-all duration-300 group-hover:border-accent group-hover:shadow-md">
          <img
            src={product.images?.[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-4xl">📦</div>'
            }}
          />
        </div>

        <div className="flex gap-2">
          <span className="inline-block px-2 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted rounded-sm">
            {product.category}
          </span>
        </div>

        <h3 className="font-serif text-lg leading-tight text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-border"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.rating})
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-1 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs line-through text-muted-foreground">
              ₹{product.originalPrice}
            </span>
            <span className="text-lg font-semibold text-accent">
              ₹{product.price}
            </span>
            <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded">
              {product.discount}% off
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span />
            <button
              onClick={(e) => {
                e.preventDefault()
                onAddToCart()
              }}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground border border-border rounded-sm transition-all duration-200 hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <ShoppingCart size={14} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
