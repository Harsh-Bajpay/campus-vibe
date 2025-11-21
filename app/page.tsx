import Link from "next/link";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Campus Vibe?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with your campus community today and discover endless opportunities
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/events"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Explore Events
              </Link>
              <Link
                href="/community"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Join Community
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
                <div className="text-gray-600 dark:text-gray-400">Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
                <div className="text-gray-600 dark:text-gray-400">Events Monthly</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Student Clubs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-400">Free to Join</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
