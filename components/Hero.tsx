export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Welcome to{' '}
          <span className="gradient-text">
            Modern Blog
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover insightful articles, expert perspectives, and inspiring stories across technology, travel, and lifestyle. 
          Join our community of readers exploring ideas that matter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors card-shadow">
            Explore Articles
          </button>
          <button className="text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors border border-blue-200">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}