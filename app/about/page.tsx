'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full px-6 lg:px-12 xl:px-10 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">How Route Right Works</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Transform any learning goal into actionable roadmaps with AI-powered personalization. 
              Whether you want to learn coding, cooking, carpentry, painting, or any other skill, follow our 
              simple 3-step process to create your customized learning journey.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12 mb-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Tell Us Your Goals</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  Start by sharing key information about your learning journey. Route Right needs to understand 
                  your unique situation to create the perfect roadmap tailored just for you.
                </p>
                <div className="bg-indigo-50 rounded-xl p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold text-lg">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Your Role & Learning Goal</p>
                      <p className="text-gray-600 text-sm">Define what you want to become or learn (e.g., "Professional Chef", "Web Developer", "Portrait Artist", "Carpenter", "Data Analyst")</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold text-lg">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Experience Level</p>
                      <p className="text-gray-600 text-sm">Choose from Beginner, Intermediate, or Advanced to get content matched to your skill level</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold text-lg">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Learning Style Preference</p>
                      <p className="text-gray-600 text-sm">Select Visual (videos/diagrams), Hands-on (projects), Reading (docs/articles), or Mixed approach</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold text-lg">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Time Commitment</p>
                      <p className="text-gray-600 text-sm">Set your weekly study hours (1-40 hours) so we can pace the content appropriately</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold text-lg">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Language & Optional Deadline</p>
                      <p className="text-gray-600 text-sm">Choose from 6+ languages and optionally set a target completion date for your goals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">AI Creates Your Roadmap</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  Powered by Google Gemini AI, Route Right analyzes your inputs and generates a comprehensive, 
                  personalized 4-week learning plan. Our AI considers your experience level, learning style, and 
                  time availability to create the most effective path forward.
                </p>
                <div className="bg-purple-50 rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-purple-600">📚</span> Top Skills Identified
                    </h4>
                    <p className="text-gray-600 text-sm">
                      The AI identifies 6 key skills you need to master, each with a clear description of why it matters for your goal
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-purple-600">📅</span> 4-Week Structured Plan
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Each week has a specific theme and focus area, with 3-4 learning items and a hands-on task to apply what you learn
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-purple-600">✨</span> Personalized Recommendations
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Content is tailored to your learning style. More videos for visual learners, more projects for hands-on learners, etc.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-purple-600">♿</span> Accessibility & Localization
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Includes accessibility considerations and localization tips for your chosen language, ensuring inclusive learning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Follow Your Journey</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  Once your roadmap is generated, you get an intuitive, interactive interface to track your progress 
                  through each week. Your learning journey is automatically saved to the database for future reference.
                </p>
                <div className="bg-teal-50 rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-teal-600">🎯</span> Visual Progress Tracking
                    </h4>
                    <p className="text-gray-600 text-sm">
                      A progress bar at the top shows which week you're on, making it easy to visualize your learning journey
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-teal-600">📋</span> Week-by-Week Breakdown
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Click on any week card to view detailed learning items, skills to practice, and hands-on tasks for that week
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-teal-600">💾</span> Auto-Saved to Database
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Your roadmap is automatically saved with MongoDB, so you can access it anytime and never lose your progress
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-teal-600">🔄</span> Generate Multiple Roadmaps
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Create as many roadmaps as you need for different goals, skills, or career paths. All saved in your dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What Makes Route Right Special</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <div className="text-4xl mb-4">🤖</div>
                <h4 className="font-bold text-gray-900 mb-2">AI-Powered Intelligence</h4>
                <p className="text-gray-600 text-sm">
                  Uses Google Gemini 2.0 Flash for lightning-fast, intelligent roadmap generation with context-aware recommendations
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="text-4xl mb-4">🎨</div>
                <h4 className="font-bold text-gray-900 mb-2">Beautiful UI/UX</h4>
                <p className="text-gray-600 text-sm">
                  Modern, futuristic design with smooth animations, gradient themes, and intuitive navigation for an enjoyable experience
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-teal-50 rounded-xl p-6 border border-pink-100">
                <div className="text-4xl mb-4">🌍</div>
                <h4 className="font-bold text-gray-900 mb-2">Multi-Language Support</h4>
                <p className="text-gray-600 text-sm">
                  Generate roadmaps in English, Spanish, French, Gujarati, Hindi, or Japanese to reach global learners
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-indigo-50 rounded-xl p-6 border border-teal-100">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="font-bold text-gray-900 mb-2">Instant Generation</h4>
                <p className="text-gray-600 text-sm">
                  Get your complete 4-week roadmap in seconds. No waiting, no complicated setup, just instant personalized results
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-6 border border-indigo-100">
                <div className="text-4xl mb-4">💡</div>
                <h4 className="font-bold text-gray-900 mb-2">Adaptive Learning</h4>
                <p className="text-gray-600 text-sm">
                  Content adapts to your experience level and learning style. Beginners get foundational content, advanced learners get deeper challenges
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-xl p-6 border border-purple-100">
                <div className="text-4xl mb-4">📊</div>
                <h4 className="font-bold text-gray-900 mb-2">Comprehensive Plans</h4>
                <p className="text-gray-600 text-sm">
                  Each roadmap includes skills overview, weekly themes, learning resources, hands-on tasks, assessments, and accessibility tips
                </p>
              </div>
            </div>
          </div>

          {/* Platform Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 mb-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About Route Right</h3>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              Route Right is an AI-powered learning roadmap generator designed to help anyone master any skill, 
              regardless of their field or background. Whether you're aspiring to become a software developer, 
              professional chef, skilled carpenter, visual artist, data scientist, or anything else. Route Right 
              creates personalized learning paths tailored to your unique goals and learning style.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              From creative pursuits like painting and music to technical fields like engineering and programming, 
              from trades like plumbing and electrical work to business skills like marketing and entrepreneurship. 
              Route Right adapts to any domain. Simply tell us what you want to learn, and our AI will structure 
              a 4-week roadmap with skills, resources, and hands-on tasks specific to your chosen field.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Built with cutting-edge technologies including Next.js 14, TypeScript, Tailwind CSS, MongoDB, 
              and Google Gemini AI, Route Right represents the future of personalized education by combining 
              artificial intelligence with thoughtful instructional design principles to democratize learning 
              across all disciplines and skill levels.
            </p>
            <p className="text-gray-600">
              Created by <span className="font-semibold">Disha Jadav</span>, a graduate student in Software Engineering 
              at San José State University. RouteRight is an AI-powered platform that demonstrates 
              the potential of AI to make quality learning experiences accessible to everyone, everywhere, for anything.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/generate-plan"
              className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Create Your Roadmap Now →
            </a>
            <p className="text-gray-600 mt-4 text-sm">It's free, fast, and takes less than 2 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
