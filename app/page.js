import EventCard from "@/components/EventCard";
import SocialGroupCard from "@/components/SocialGroupCard";
import ResourceCard from "@/components/ResourceCard";
import SuggestionCard from "@/components/SuggestionCard";
import { mockFeedData } from "@/lib/data";

const componentMap = {
  'EVENT': EventCard,
  'SOCIAL_GROUP': SocialGroupCard,
  'RESOURCE': ResourceCard,
  'SUGGESTION': SuggestionCard,
};

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Campus Vibe! 🎉</h2>
        <p className="text-zinc-300">
          Your personalized feed of events, study groups, and campus resources all in one place.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold whitespace-nowrap">
          All
        </button>
        <button className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-full text-sm font-semibold whitespace-nowrap transition-colors">
          Events
        </button>
        <button className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-full text-sm font-semibold whitespace-nowrap transition-colors">
          Study Groups
        </button>
        <button className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-full text-sm font-semibold whitespace-nowrap transition-colors">
          Resources
        </button>
        <button className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-full text-sm font-semibold whitespace-nowrap transition-colors">
          Suggestions
        </button>
      </div>

      {/* Feed Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Your Vibe Feed</h2>
        <span className="text-sm text-zinc-400">{mockFeedData.length} items</span>
      </div>

      {/* Feed Cards */}
      <div className="space-y-4">
        {mockFeedData.map((item) => {
          const Component = componentMap[item.type];
          return Component ? <Component key={item.id} item={item} /> : null;
        })}
      </div>

      {/* Create New Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-primary hover:bg-primary/80 text-white rounded-full shadow-lg flex items-center justify-center text-2xl font-bold transition-all hover:scale-110">
          +
        </button>
      </div>
    </div>
  );
}
