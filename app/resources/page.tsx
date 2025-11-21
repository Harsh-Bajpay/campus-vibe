import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ResourcesPage() {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    pink: "text-pink-600",
    orange: "text-orange-600",
    indigo: "text-indigo-600",
  };

  const resources = [
    {
      id: 1,
      title: "Study Materials",
      description: "Access lecture notes, textbooks, and study guides shared by students",
      icon: "📚",
      count: "500+ resources",
      color: "blue" as keyof typeof colorClasses,
    },
    {
      id: 2,
      title: "Career Guidance",
      description: "Resume templates, interview tips, and career counseling resources",
      icon: "💼",
      count: "100+ guides",
      color: "green" as keyof typeof colorClasses,
    },
    {
      id: 3,
      title: "Academic Support",
      description: "Tutoring services, writing center, and learning workshops",
      icon: "🎓",
      count: "50+ services",
      color: "purple" as keyof typeof colorClasses,
    },
    {
      id: 4,
      title: "Mental Health",
      description: "Counseling services, wellness programs, and support groups",
      icon: "🧠",
      count: "24/7 support",
      color: "pink" as keyof typeof colorClasses,
    },
    {
      id: 5,
      title: "Campus Services",
      description: "Library, IT support, housing, and transportation information",
      icon: "🏛️",
      count: "10+ services",
      color: "orange" as keyof typeof colorClasses,
    },
    {
      id: 6,
      title: "Financial Aid",
      description: "Scholarships, grants, and financial planning resources",
      icon: "💰",
      count: "200+ opportunities",
      color: "indigo" as keyof typeof colorClasses,
    },
  ];

  const tools = [
    {
      name: "Library Portal",
      description: "Access digital library and research databases",
      link: "#",
    },
    {
      name: "Student Portal",
      description: "Manage your courses, grades, and schedules",
      link: "#",
    },
    {
      name: "Learning Management",
      description: "Access course materials and submit assignments",
      link: "#",
    },
    {
      name: "Career Services",
      description: "Explore internships and job opportunities",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-4">Student Resources</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Everything you need to succeed academically, professionally, and personally
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Browse Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer"
                >
                  <div className="text-5xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {resource.description}
                  </p>
                  <div className={`inline-flex items-center text-sm font-semibold ${colorClasses[resource.color]}`}>
                    {resource.count}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Tools */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Quick Access Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.link}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tool.description}
                    </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Our support team is here to assist you with any questions or concerns
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Contact Support
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
