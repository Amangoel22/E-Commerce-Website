import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Truck, RotateCcw, Shield } from 'lucide-react'
import Navbar from '../components/Navbar'
import { getProductById } from '../api/products'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, getTotalItems } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getProductById(id)
        setProduct(response.data)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!product) return (
    <main className="min-h-screen">
      <Navbar cartCount={0} />
      <div className="h-16" />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
        <Link to="/" className="text-accent hover:underline">Back to Shop</Link>
      </div>
    </main>
  )

  const reviewCount = (product.id.charCodeAt(0) * 17 + 100) % 400 + 100

  return (
    <main className="min-h-screen">
      <Navbar cartCount={getTotalItems()} />
      <div className="h-16" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8 flex gap-2 text-sm">
          <Link to="/" className="text-accent hover:underline">Home</Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/" className="text-accent hover:underline">{product.category}</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* image */}
          <div className="flex flex-col gap-6">
            <div className="aspect-square bg-secondary border border-border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-8xl">📦</div>'
                }}
              />
            </div>
          </div>

          {/* details */}
          <div className="flex flex-col gap-6">
            <div className="inline-block w-fit px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground bg-accent rounded-full">
              {product.category}
            </div>

            <h1 className="font-serif text-4xl leading-tight text-foreground">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-border"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({reviewCount} reviews)
              </span>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-foreground">
                  ₹{product.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-sm font-semibold bg-accent/10 text-accent px-2 py-1 rounded">
                  {product.discount}% off
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">
                You save ₹{(product.originalPrice - product.price).toFixed(2)}
              </p>
            </div>

            <div className="flex gap-4 items-center pt-4">
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3 bg-accent text-accent-foreground font-medium rounded-sm hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>

            <div className="border-t border-border pt-6 grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <Truck size={24} className="text-accent" />
                <p className="text-xs font-medium text-foreground">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over ₹500</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RotateCcw size={24} className="text-accent" />
                <p className="text-xs font-medium text-foreground">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day guarantee</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield size={24} className="text-accent" />
                <p className="text-xs font-medium text-foreground">2 Year Warranty</p>
                <p className="text-xs text-muted-foreground">On all products</p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Sold by</h3>
              <p className="text-sm text-foreground font-medium mb-1">Shop.com Official Store</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="text-accent">★★★★★</span>
                <span>4.8 out of 5 (2,450 ratings)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-12">
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Specifications</h2>
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">General</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="font-medium text-foreground">Brand:</span> Premium Brand Co.</li>
                  <li><span className="font-medium text-foreground">Model:</span> {product.name}</li>
                  <li><span className="font-medium text-foreground">Color:</span> Black/Silver</li>
                  <li><span className="font-medium text-foreground">Weight:</span> 0.5 kg</li>
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Details</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="font-medium text-foreground">Material:</span> Premium quality materials</li>
                  <li><span className="font-medium text-foreground">Dimensions:</span> 25 x 15 x 5 cm</li>
                  <li><span className="font-medium text-foreground">Warranty:</span> 24 months</li>
                  <li><span className="font-medium text-foreground">SKU:</span> SKU-{product.id.slice(-6)}</li>
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Product Info</h2>
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Availability</h3>
                <p className="text-sm text-green-600 font-medium mb-2">
                  ✓ In Stock ({product.stock} items)
                </p>
                <p className="text-xs text-muted-foreground">Usually ships within 24 hours</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Return Policy</h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• 30-day return window</li>
                  <li>• Free return shipping</li>
                  <li>• Full refund guarantee</li>
                  <li>• No questions asked</li>
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Payment Options</h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• UPI</li>
                  <li>• Credit/Debit Cards</li>
                  <li>• Net Banking</li>
                  <li>• Digital Wallets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}