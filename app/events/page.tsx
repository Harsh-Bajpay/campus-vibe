import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function EventsPage() {
  const colorStyles = {
    blue: {
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      badge: "text-blue-600 bg-blue-100 dark:bg-blue-900/20",
    },
    purple: {
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      badge: "text-purple-600 bg-purple-100 dark:bg-purple-900/20",
    },
    green: {
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      badge: "text-green-600 bg-green-100 dark:bg-green-900/20",
    },
    orange: {
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600",
      badge: "text-orange-600 bg-orange-100 dark:bg-orange-900/20",
    },
    pink: {
      gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
      badge: "text-pink-600 bg-pink-100 dark:bg-pink-900/20",
    },
    indigo: {
      gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      badge: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20",
    },
  };

  const events = [
    {
      id: 1,
      title: "Tech Talk: AI in Education",
      date: "Dec 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Auditorium Hall",
      category: "Workshop",
      color: "blue" as keyof typeof colorStyles,
    },
    {
      id: 2,
      title: "Annual Cultural Fest",
      date: "Dec 20, 2024",
      time: "10:00 AM - 8:00 PM",
      location: "Main Campus Ground",
      category: "Cultural",
      color: "purple" as keyof typeof colorStyles,
    },
    {
      id: 3,
      title: "Career Fair 2024",
      date: "Jan 5, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center",
      category: "Career",
      color: "green" as keyof typeof colorStyles,
    },
    {
      id: 4,
      title: "Hackathon: Code for Change",
      date: "Jan 12, 2025",
      time: "8:00 AM - 8:00 PM",
      location: "Computer Lab Building",
      category: "Competition",
      color: "orange" as keyof typeof colorStyles,
    },
    {
      id: 5,
      title: "Mental Health Awareness Workshop",
      date: "Jan 18, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Student Wellness Center",
      category: "Workshop",
      color: "pink" as keyof typeof colorStyles,
    },
    {
      id: 6,
      title: "Sports Day",
      date: "Jan 25, 2025",
      time: "7:00 AM - 6:00 PM",
      location: "Sports Complex",
      category: "Sports",
      color: "indigo" as keyof typeof colorStyles,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-4">Campus Events</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Discover exciting events happening on campus. From workshops to cultural fests, never miss out!
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Upcoming Events
              </h2>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Event
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className={`h-2 ${colorStyles[event.color].gradient}`} />
                  <div className="p-6">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold ${colorStyles[event.color].badge} rounded-full mb-3`}>
                      {event.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                    <button className="mt-4 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      View Details
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
