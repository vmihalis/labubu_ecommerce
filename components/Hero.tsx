import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to LABUBUS World
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover the enchanting collection of LABUBUS designer toys and collectibles that bring magic to your everyday life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 text-gray-50"
          preserveAspectRatio="none"
          viewBox="0 0 1440 48"
          fill="currentColor"
        >
          <path d="M0,48 L1440,48 L1440,24 C1140,0 840,48 540,24 C240,0 0,24 0,24 Z" />
        </svg>
      </div>
    </div>
  )
}