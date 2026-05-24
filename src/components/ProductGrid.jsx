import { useState, useEffect } from 'react'
import { getProducts, searchProducts } from '../api/products'
import ProductCard from './ProductCard'

export default function ProductGrid({ activeCategory, onAddToCart, searchQuery = '' }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [visibleCount, setVisibleCount] = useState(16)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')

        let response
        if (searchQuery.trim()) {
          response = await searchProducts(searchQuery)
        } else {
          response = await getProducts(activeCategory)
        }

        setProducts(response.data)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [activeCategory, searchQuery])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 bg-secondary animate-pulse rounded-lg border border-border" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 text-center">
        <p className="text-muted-foreground">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 border border-border rounded-sm hover:border-accent transition-all"
        >
          Try again
        </button>
      </div>
    )
  }

  const visibleProducts = products.slice(0, visibleCount)
  const hasMore = visibleCount < products.length

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {visibleProducts.map((product) => (
          <div key={product.id} className="animate-fade-in">
            <ProductCard
              product={product}
              onAddToCart={() => onAddToCart(product)}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount(prev => prev + 16)}
            className="px-8 py-3 border border-border text-foreground font-medium rounded-sm transition-all duration-200 hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            Show More Products
          </button>
        </div>
      )}
    </div>
  )
}