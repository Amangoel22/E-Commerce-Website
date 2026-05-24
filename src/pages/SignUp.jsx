import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Phone } from 'lucide-react'
import { registerUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await registerUser(formData)
      navigate('/signin')
    } catch (error) {
      setServerError(error.response?.data?.message || 'Something went wrong.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-md px-4 md:px-0">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 md:p-10">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block mb-6">
              <h1 className="font-serif text-3xl font-bold text-foreground hover:text-accent transition-colors">
                shop.com
              </h1>
            </Link>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Create Account
            </h2>
            <p className="text-sm text-muted-foreground">
              Join us and start shopping the best products
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:border-accent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:border-accent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:border-accent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:border-accent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:border-accent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            <label className="flex items-start gap-2 cursor-pointer mt-6">
              <input type="checkbox" className="mt-1 rounded border-border" required />
              <span className="text-xs text-muted-foreground">
                I agree to the{' '}
                <a href="#" className="text-accent hover:underline font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-accent hover:underline font-medium">Privacy Policy</a>
              </span>
            </label>

            {serverError && (
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-accent text-accent-foreground font-medium rounded-sm transition-all duration-200 hover:opacity-90 active:scale-95 mt-6"
            >
              Create Account
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">Or sign up with</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <div className="space-y-3">
            <button className="w-full py-2 border border-border rounded-sm text-foreground font-medium transition-all duration-200 hover:border-accent hover:bg-muted">
              Google
            </button>
            <button className="w-full py-2 border border-border rounded-sm text-foreground font-medium transition-all duration-200 hover:border-accent hover:bg-muted">
              Apple
            </button>
          </div>

          <div className="mt-8 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/signin" className="text-accent font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-accent hover:underline">
              Back to Shop
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Your data is safe with us. We never share your information with third parties.
        </p>
      </div>
    </main>
  )
}
