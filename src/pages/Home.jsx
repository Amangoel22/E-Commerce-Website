import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import PromoBanner from '../components/PromoBanner'
import CategoryFilter from '../components/CategoryFilter'
import ProductGrid from '../components/ProductGrid'
import IntroAnimation from '../components/IntroAnimation'

export default function Home() {
  const { addToCart, getTotalItems } = useCart()
  const [showIntro, setShowIntro] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <>
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      <main className={`transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar 
          cartCount={getTotalItems()}
          onSearch={setSearchQuery}
        />

        <div className="h-16" />

        <PromoBanner />

        <div className="border-b border-border">
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <ProductGrid 
          activeCategory={activeCategory}
          onAddToCart={handleAddToCart}
          searchQuery={searchQuery}
        />

        <footer className="bg-secondary border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">
                  About
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Shop.com brings together the finest curated products from around the world.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-4 text-foreground">Customer</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-4 text-foreground">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-4 text-foreground">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <p className="text-center text-sm text-muted-foreground">
                © 2024 Shop.com. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
