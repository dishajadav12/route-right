import Link from "next/link";

export default function HomePage() {
  return (
    <main className="px-4 pb-16 max-w-5xl mx-auto">
      <section className="pt-16 pb-12 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            AI-Powered Learning Platform
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Your Personalized Learning Journey Starts Here
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create custom learning roadmaps tailored to your goals, experience level, and schedule. 
            Powered by AI to help you achieve mastery in any skill.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg ring-1 ring-black/5">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
            <p className="text-sm text-gray-600">Define your learning objectives and get a structured 4-week plan</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg ring-1 ring-black/5">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Adaptive Learning</h3>
            <p className="text-sm text-gray-600">Customize based on your role, experience, and time commitment</p>
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
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold ring-2 ring-indigo-200 hover:bg-indigo-50 transition-all"
          >
            How It Works
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Route Right?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold mb-1">AI-Powered Personalization</h4>
                <p className="text-sm text-gray-600">Advanced AI analyzes your goals and creates a tailored learning path just for you</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold mb-1">Structured Weekly Plans</h4>
                <p className="text-sm text-gray-600">Clear week-by-week breakdown with specific tasks and milestones</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold mb-1">Hands-On Practice</h4>
                <p className="text-sm text-gray-600">Each week includes practical tasks to apply what you learn</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="font-semibold mb-1">Save & Track Progress</h4>
                <p className="text-sm text-gray-600">All roadmaps are automatically saved for future reference</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
