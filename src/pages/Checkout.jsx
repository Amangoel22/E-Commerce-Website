import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const [searchQuery, setSearchQuery] = useState('')

  const TAX_RATE = 0.10
  const subtotal = getCartTotal()
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty')
      return
    }
    navigate('/payment')
  }

  return (
    <>
      <Navbar cartCount={cartItems.length} onSearch={setSearchQuery} />
      <div className="h-16" />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-secondary border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-border p-6 last:border-b-0 hover:bg-muted/30 transition-colors">
                    <div className="flex gap-6">
                      <img
                        src={item.product?.images[0] ?? item.image}
                        alt={item.product?.name ?? item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                          {item.product?.name ?? item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs line-through text-muted-foreground">
                              ₹{item.originalPrice}
                            </span>
                            <span className="text-lg font-semibold text-accent">
                              ₹{item.product?.price ?? item.price}
                            </span>
                            <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded">
                              {item.discount}% off
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            Subtotal: ₹{(item.product?.price ?? item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-semibold text-foreground">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 bg-muted p-4 rounded-lg">
                  <span className="font-serif text-xl font-bold text-foreground">Total</span>
                  <span className="font-serif text-3xl font-bold text-accent">₹{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
                >
                  Proceed to Payment
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full mt-3 py-3 border border-border text-foreground font-semibold rounded-lg hover:border-accent hover:bg-muted transition-all duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
