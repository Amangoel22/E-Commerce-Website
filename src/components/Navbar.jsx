import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'


export default function Navbar({ cartCount, onSearch }) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/' },
    { label: 'Deals', href: '/' },
    { label: 'New Arrivals', href: '/' },
    { label: 'About', href: '/about' },
  ]

  // TODO: Backend - Connect to product database search API
  // Replace this with actual backend search endpoint
  const handleSearch = (query) => {
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <h1 className="font-serif text-2xl font-bold text-foreground hover:text-accent transition-colors">
            shop.com
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center border border-border rounded-full px-3 py-2 bg-secondary transition-all duration-200 hover:border-accent focus-within:border-accent">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-32"
            />
            <Search size={16} className="text-muted-foreground ml-2" />
          </div>

          <Link to="/checkout" className="relative p-2 transition-all duration-200 hover:text-accent">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 transition-all duration-200 hover:text-accent"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Auth Links - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm border border-border rounded-sm hover:border-accent transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/signin" className="px-3 py-2 text-sm font-medium text-foreground border border-border rounded-sm transition-all duration-200 hover:border-accent">
                  Sign In
                </Link>
                <Link to="/signup" className="px-3 py-2 text-sm font-medium text-accent-foreground bg-accent rounded-sm transition-all duration-200 hover:opacity-90">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center border border-border rounded-full px-3 py-2 bg-secondary focus-within:border-accent">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
              />
              <Search size={16} className="text-muted-foreground ml-2" />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-lg font-medium text-foreground transition-colors duration-200 hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Hi, {user.name}</span>
                  <button
                    onClick={logout}
                    className="px-3 py-2 text-sm border border-border rounded-sm hover:border-accent transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signin" className="px-3 py-2 text-sm font-medium text-foreground border border-border rounded-sm transition-all duration-200 hover:border-accent">
                    Sign In
                  </Link>
                  <Link to="/signup" className="px-3 py-2 text-sm font-medium text-accent-foreground bg-accent rounded-sm transition-all duration-200 hover:opacity-90">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
