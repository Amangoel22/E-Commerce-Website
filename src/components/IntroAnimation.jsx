import { useEffect, useState } from 'react'

export default function IntroAnimation({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      const exitTimer = setTimeout(onComplete, 400)
      return () => clearTimeout(exitTimer)
    }, 2300)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isExiting) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className={isExiting ? 'animate-intro-out' : 'animate-intro-in'}>
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground text-center">
            shop.com
          </h1>
        </div>
      </div>
    )
  }

  return null
}
