import { useState, useEffect } from 'react'

export default function PromoBanner() {
  const messages = [
    { text: 'Free shipping on orders over ₹50', code: 'SHIP2024' },
    { text: '20% off your first purchase', code: 'FIRST20' },
    { text: 'Exclusive deals on new arrivals', code: 'NEW2024' },
    { text: 'Bundle 3+ items and save 15%', code: 'BUNDLE15' },
    { text: 'Same day delivery on selected areas', code: 'SAMEDAY' },
  ]

  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-secondary border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-center relative min-h-16">
        <div className="flex flex-col items-center justify-center text-center w-full gap-2">
          <p className="text-sm md:text-base text-foreground animate-fade-in transition-all duration-500">
            {messages[currentMessage].text}
          </p>
          <div className="inline-block px-3 py-1 bg-foreground text-background rounded-full text-xs font-medium">
            Code: {messages[currentMessage].code}
          </div>
        </div>
      </div>
    </div>
  )
}
