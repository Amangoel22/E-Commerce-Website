import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { loginUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!email) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
        const response = await loginUser({ email, password })
        
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        console.log('Logged in:', response.data.user)
        login(response.data.user, response.data.token)
        navigate('/')
    } catch (error) {
        console.log('Error:', error.response.data.message)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4 md:px-0">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 md:p-10">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block mb-6">
              <h1 className="font-serif text-3xl font-bold text-foreground hover:text-accent transition-colors">
                shop.com
              </h1>
            </Link>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:border-accent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({ ...errors, password: '' })
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:border-accent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-accent hover:underline font-medium">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-accent text-accent-foreground font-medium rounded-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            >
              Sign In
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">Or continue with</span>
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
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-accent font-medium hover:underline">
                Sign Up
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
          Your security is our priority. We use industry-standard encryption to protect your data.
        </p>
      </div>
    </main>
  )
}
