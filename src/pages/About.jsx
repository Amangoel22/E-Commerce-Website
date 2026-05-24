import { Link } from 'react-router-dom'
import { Heart, Globe, Users, Award } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar cartCount={0} />
      <div className="h-16" />

      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="text-center space-y-4">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
              About Shop.com
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bringing the finest curated products from around the world to your doorstep since 2024.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Shop.com was founded with a simple mission: to make premium shopping accessible to everyone. 
                We believed that quality products shouldn't be limited to brick-and-mortar stores or exclusive retailers.
              </p>
              <p>
                What started as a small team of passionate product enthusiasts has grown into a trusted marketplace 
                serving thousands of customers worldwide. We carefully curate every product in our collection to ensure 
                the highest standards of quality, sustainability, and value.
              </p>
              <p>
                Today, we're proud to offer an extensive selection across multiple categories, from electronics 
                and fashion to home goods and beauty products. Our commitment to excellence extends beyond our products 
                to our customer service, shipping, and return policies.
              </p>
            </div>
          </div>
          <div className="bg-secondary border border-border rounded-lg h-80 flex items-center justify-center">
            <span className="text-8xl">🛍️</span>
          </div>
        </div>
      </section>

      <section className="bg-muted border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-background border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <Heart size={40} className="text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-3">Customer First</h3>
              <p className="text-sm text-muted-foreground">
                Your satisfaction is our priority. We listen, adapt, and continuously improve our service based on your feedback.
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <Globe size={40} className="text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-3">Sustainability</h3>
              <p className="text-sm text-muted-foreground">
                We partner with eco-conscious brands and minimize our environmental footprint through sustainable packaging.
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <Users size={40} className="text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-3">Community</h3>
              <p className="text-sm text-muted-foreground">
                We support local artisans and small businesses, helping them reach a global audience while creating jobs.
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <Award size={40} className="text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-3">Quality</h3>
              <p className="text-sm text-muted-foreground">
                Every product is carefully tested and verified to meet our high standards before it reaches you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-serif text-4xl md:text-5xl font-bold text-accent mb-2">10K+</p>
            <p className="text-muted-foreground">Products Available</p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl font-bold text-accent mb-2">50K+</p>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl font-bold text-accent mb-2">100+</p>
            <p className="text-muted-foreground">Brand Partners</p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl font-bold text-accent mb-2">24h</p>
            <p className="text-muted-foreground">Average Shipping</p>
          </div>
        </div>
      </section>

      <section className="bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-secondary flex items-center justify-center">
                  <span className="text-6xl">👤</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-foreground mb-1">Team Member {i}</h3>
                  <p className="text-sm text-accent mb-3">Leadership Role</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Passionate about delivering exceptional customer experiences and building a sustainable future.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Ready to Shop?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium products and join thousands of satisfied customers.
          </p>
          <Link 
            to="/"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground font-medium rounded-sm hover:opacity-90 transition-all duration-200"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </main>
  )
}
