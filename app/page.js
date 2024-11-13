import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold sm:text-6xl mb-6">
            Generate Perfect Emails with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional emails in seconds. Perfect for business, sales, or personal communication.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/templates" 
              className="px-6 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const features = [
  {
    title: "AI-Powered Writing",
    description: "Generate professional emails instantly using advanced AI technology."
  },
  {
    title: "Multiple Templates",
    description: "Choose from a variety of templates for different email types."
  },
  {
    title: "Easy Customization",
    description: "Customize tone, style, and content to match your needs."
  }
]