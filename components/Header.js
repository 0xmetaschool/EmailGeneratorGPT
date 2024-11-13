'use client'

const Header = () => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <h1 className="font-bold text-xl">
            Email Generator
          </h1>
          
          <nav className="flex items-center space-x-4">
            <a 
              href="/dashboard" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              Dashboard
            </a>
            <a 
              href="/templates" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              Templates
            </a>
            <a 
              href="/signin"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign In
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header