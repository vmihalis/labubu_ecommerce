import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900">About LABUBUS</h1>
            <p className="text-lg text-gray-600 mt-2">
              Discover the story behind the magic
            </p>
          </div>
        </div>

        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  LABUBUS began as a dream to create characters that could bring joy and wonder to people of all ages.
                  Born from the creative mind of artist Kasing Lung, LABUBUS has evolved from simple sketches into a
                  global phenomenon that captures hearts with its unique charm and personality.
                </p>
                <p className="text-gray-600">
                  Each LABUBUS character tells a story - from mischievous grins to thoughtful expressions,
                  every detail is carefully crafted to create an emotional connection with collectors.
                  What started as a small art project has grown into a beloved brand that represents
                  creativity, quality, and the joy of collecting.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Art of LABUBUS</h2>
                <p className="text-gray-600 mb-4">
                  Every LABUBUS creation is more than just a collectible - it's a piece of art.
                  Our design team works tirelessly to ensure that each figure captures the essence
                  of the LABUBUS spirit while maintaining the highest standards of quality and craftsmanship.
                </p>
                <p className="text-gray-600">
                  From limited edition releases to collaboration series, we constantly push the boundaries
                  of what designer toys can be. Our commitment to innovation and artistry has made LABUBUS
                  a favorite among collectors worldwide.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
                <p className="text-gray-600 mb-4">
                  LABUBUS is more than a brand - it's a community of passionate collectors, artists,
                  and dreamers who share a love for unique design and creative expression. When you
                  collect LABUBUS, you become part of a global family united by imagination and wonder.
                </p>
                <p className="text-gray-600">
                  Follow us on social media to stay updated on new releases, exclusive events,
                  and to connect with fellow LABUBUS enthusiasts from around the world.
                  Together, we're creating a world where art, play, and collecting come together
                  in perfect harmony.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Promise</h2>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Authenticity</h3>
                    <p className="text-gray-600 text-sm">
                      Every LABUBUS product is 100% authentic and officially licensed
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Quality</h3>
                    <p className="text-gray-600 text-sm">
                      Premium materials and meticulous attention to detail in every piece
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Community</h3>
                    <p className="text-gray-600 text-sm">
                      A vibrant global community of collectors and enthusiasts
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}