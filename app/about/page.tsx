import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "👨‍💻",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      image: "👩‍🎓",
    },
    {
      name: "David Kim",
      role: "Product Designer",
      image: "👨‍🎨",
    },
  ];

  const values = [
    {
      title: "Community First",
      description: "We prioritize building strong, supportive communities that help students thrive",
      icon: "🤝",
    },
    {
      title: "Innovation",
      description: "We constantly evolve to meet the changing needs of modern campus life",
      icon: "💡",
    },
    {
      title: "Inclusivity",
      description: "We create spaces where every student feels welcome and valued",
      icon: "🌈",
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do to serve our community",
      icon: "⭐",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-4">About Campus Vibe</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Connecting students, building communities, and enhancing campus life
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  Campus Vibe was created with a simple yet powerful vision: to make college life more connected, engaging, and meaningful for every student.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  We believe that the best part of college isn't just the education—it's the people you meet, the experiences you have, and the memories you create along the way.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Our platform brings together events, communities, and resources in one place, making it easier than ever to get involved and make the most of your college experience.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
                      🎯
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        Student-Centered
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Built by students, for students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
                      🚀
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        Always Growing
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Continuously improving with your feedback
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
                      🌍
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        Global Impact
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Serving campuses worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center text-6xl">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Join Us Today</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Be part of a vibrant community that's shaping the future of campus life
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-lg">
              Get Started
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
