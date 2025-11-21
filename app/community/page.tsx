import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CommunityPage() {
  const clubs = [
    {
      id: 1,
      name: "Coding Club",
      members: 245,
      category: "Technology",
      description: "Learn, code, and build amazing projects together",
      image: "💻",
    },
    {
      id: 2,
      name: "Drama Society",
      members: 189,
      category: "Arts",
      description: "Express yourself through the art of theater and performance",
      image: "🎭",
    },
    {
      id: 3,
      name: "Photography Club",
      members: 156,
      category: "Creative",
      description: "Capture moments and learn the art of visual storytelling",
      image: "📸",
    },
    {
      id: 4,
      name: "Debate Club",
      members: 134,
      category: "Academic",
      description: "Sharpen your critical thinking and public speaking skills",
      image: "🗣️",
    },
    {
      id: 5,
      name: "Music Band",
      members: 98,
      category: "Arts",
      description: "Create harmonies and perform at campus events",
      image: "🎵",
    },
    {
      id: 6,
      name: "Environmental Club",
      members: 203,
      category: "Social",
      description: "Make a difference for our planet and campus sustainability",
      image: "🌱",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-4">Student Community</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Join clubs, connect with like-minded students, and be part of something amazing
            </p>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Active Clubs</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">5K+</div>
                <div className="text-gray-600 dark:text-gray-400">Members</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-gray-600 dark:text-gray-400">Weekly Activities</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl">
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">Community Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Clubs Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Explore Clubs
              </h2>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Create Club
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((club) => (
                <div
                  key={club.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{club.image}</div>
                    <span className="px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                      {club.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {club.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {club.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {club.members} members
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
