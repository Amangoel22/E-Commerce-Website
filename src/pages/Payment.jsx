import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import Navbar from '../components/Navbar'
import { Lock, CheckCircle } from 'lucide-react'

export default function Payment() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart, getTotalItems } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [error, setError] = useState('')

  const TAX_RATE = 0.10
  const subtotal = getCartTotal()
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty')
      return
    }

    setLoading(true)
    setError('')

    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        setError('Failed to load payment gateway. Check your internet connection.')
        setLoading(false)
        return
      }

      const { data } = await axiosInstance.post('/payment/create-order')

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'shop.com',
        description: 'Order Payment',
        order_id: data.orderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || ''
        },
        theme: {
          color: '#000000'
        },
        handler: async (response) => {
          try {
            await axiosInstance.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })

            clearCart()
            setPaymentSuccess(true)
          } catch (err) {
            setError('Payment verification failed. Contact support.')
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            setError('Payment cancelled.')
          }
        }
      }

      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.open()

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  if (paymentSuccess) {
    return (
      <>
        <Navbar cartCount={0} />
        <div className="h-16" />
        <main className="max-w-2xl mx-auto px-4 py-24">
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="bg-muted p-6 rounded-lg mb-8">
              <p className="text-sm text-muted-foreground mb-2">Order Total</p>
              <p className="font-serif text-3xl font-bold text-accent">
                ₹{total.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar cartCount={getTotalItems()} />
      <div className="h-16" />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-8">
          Order Summary
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {cartItems.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => {
                  const product = item.product || item
                  const price = item.product ? item.product.price : item.price
                  const name = item.product ? item.product.name : item.name
                  const image = item.product ? item.product.images?.[0] : item.image

                  return (
                    <div key={item.id} className="border-b border-border p-6 last:border-b-0">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden shrink-0">
                          <img
                            src={item.product?.images?.[0] ?? item.images?.[0]}
                            alt={item.product?.name ?? item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem">📦</div>'
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground">
                          ₹{(price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Payment
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 bg-muted p-4 rounded-lg">
                <span className="font-serif text-xl font-bold">Total</span>
                <span className="font-serif text-3xl font-bold text-accent">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )}

              <button
                onClick={handlePayment}
                disabled={loading || cartItems.length === 0}
                className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Lock size={16} />
                {loading ? 'Opening Payment...' : `Pay ₹${total.toFixed(2)}`}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secured by Razorpay. Supports UPI, Cards, Netbanking & Wallets.
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}