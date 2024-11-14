import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-30">
            <svg 
              viewBox="0 0 400 400" 
              className="w-[800px] h-[800px]" 
              fill="none"
            >
              <circle cx="200" cy="200" r="150" fill="url(#grad1)"/>
              <defs>
                <radialGradient id="grad1">
                  <stop offset="0%" stopColor="#000000"/>
                  <stop offset="100%" stopColor="#6366f1"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl font-bold sm:text-7xl mb-6 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
            Generate Perfect Emails with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional emails in seconds. Perfect for business, sales, or personal communication.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link 
              href="/templates" 
              className="px-8 py-4 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
            >
              View Templates
            </Link>
          </div>

          {/* Feature Preview */}
          <div className="mt-20 bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"/>
              <div className="w-3 h-3 rounded-full bg-yellow-500"/>
              <div className="w-3 h-3 rounded-full bg-green-500"/>
            </div>
            <div className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Type</label>
                <div className="h-10 bg-gray-100 rounded-md animate-pulse"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tone</label>
                <div className="h-10 bg-gray-100 rounded-md animate-pulse"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Content</label>
                <div className="h-32 bg-gray-100 rounded-md animate-pulse"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-black rounded-lg mb-6 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Generating Perfect Emails Today</h2>
          <p className="mb-8 text-gray-400">Join thousands of professionals who save time with MagicMail</p>
          <Link 
            href="/dashboard" 
            className="px-8 py-4 bg-white text-black rounded-md hover:bg-gray-100 transition-colors inline-block"
          >
            Try It Free
          </Link>
        </div>
      </section>
    </main>
  )
}

const features = [
  {
    title: "AI-Powered Writing",
    description: "Generate professional emails instantly using advanced AI technology.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Multiple Templates",
    description: "Choose from a variety of templates for different email types.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  {
    title: "Easy Customization",
    description: "Customize tone, style, and content to match your needs.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  }
]