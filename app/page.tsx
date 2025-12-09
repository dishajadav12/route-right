import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <main className="px-4 pb-16">
        {/* Hero Section */}
        <section className="pt-16 pb-12 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              AI-Powered Learning Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Your Personalized Learning Journey Starts Here
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform any learning goal into actionable roadmaps with AI-powered personalization. 
              Whether you want to learn coding, cooking, carpentry, painting, or any other skill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg ring-1 ring-black/5">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
              <p className="text-sm text-gray-600">Define your learning objectives and get a structured plan tailored to your goals</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg ring-1 ring-black/5">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Adaptive Learning</h3>
              <p className="text-sm text-gray-600">Content adapts to your experience level, learning style, and time availability</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg ring-1 ring-black/5">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Language</h3>
              <p className="text-sm text-gray-600">Generate roadmaps in 6+ languages for global learners</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate-plan"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Create Your Roadmap
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Route Right Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our simple 3-step process to create your customized learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tell Us Your Goals</h3>
              <p className="text-gray-600 mb-4">
                Share your role, learning goal, experience level, available time, and preferred learning style
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Creates Your Roadmap</h3>
              <p className="text-gray-600 mb-4">
                Our AI analyzes your inputs and generates a comprehensive learning plan with skills, resources, and tasks
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Follow Your Journey</h3>
              <p className="text-gray-600 mb-4">
                Track your progress through an intuitive interface. Your roadmap is auto-saved for future reference
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Route Right Special</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="font-bold text-gray-900 mb-2">AI-Powered Intelligence</h4>
              <p className="text-gray-600 text-sm">
                Uses Google Gemini 2.0 Flash for lightning-fast, intelligent roadmap generation
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-teal-50 rounded-xl p-6 border border-pink-100">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="font-bold text-gray-900 mb-2">Multi-Language Support</h4>
              <p className="text-gray-600 text-sm">
                Generate roadmaps in English, Spanish, French, Gujarati, Hindi, or Japanese
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-indigo-50 rounded-xl p-6 border border-teal-100">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="font-bold text-gray-900 mb-2">Instant Generation</h4>
              <p className="text-gray-600 text-sm">
                Get your complete roadmap in seconds with instant personalized results
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-6 border border-indigo-100">
              <div className="text-4xl mb-4">💡</div>
              <h4 className="font-bold text-gray-900 mb-2">Adaptive Learning</h4>
              <p className="text-gray-600 text-sm">
                Content adapts to your experience level and learning style preferences
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-xl p-6 border border-purple-100">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="font-bold text-gray-900 mb-2">Comprehensive Plans</h4>
              <p className="text-gray-600 text-sm">
                Includes skills, resources, tasks, assessments, and accessibility tips
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-6xl mx-auto py-16">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-indigo-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About Route Right</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Route Right is an AI-powered learning roadmap generator designed to help anyone master any skill, 
              regardless of their field or background. From creative pursuits like painting and music to technical 
              fields like engineering and programming, from trades to business skills - Route Right adapts to any domain.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Built with cutting-edge technologies including Next.js 14, TypeScript, Tailwind CSS, MongoDB, 
              and Google Gemini AI, Route Right represents the future of personalized education.
            </p>
            <p className="text-gray-600">
              Created by <span className="font-semibold">Disha Jadav</span>, a graduate student in Software Engineering 
              at San José State University.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500" />
                <span className="text-lg font-semibold">Route Right</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered learning roadmaps for mastering any skill
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/generate-plan" className="hover:text-white transition">Generate Plan</Link></li>
                <li><Link href="/your-plans" className="hover:text-white transition">Your Plans</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://www.linkedin.com/in/disha-jadav-606484209/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="mailto:dishajadav12402@gmail.com" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2025 Route Right. Created by Disha Jadav.</p>
            <p className="text-sm text-gray-400 mt-2 md:mt-0">Built with Next.js, TypeScript, and Google Gemini AI</p>
          </div>
        </div>
      </footer>
    </>
  );
}
