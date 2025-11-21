export default function EventCard({ item }) {
    return (
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 space-y-2 hover:border-primary transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-semibold text-xs uppercase tracking-wider text-primary mb-1">
              Event
            </div>
            <h3 className="font-bold text-lg text-white">{item.title}</h3>
            <p className="text-zinc-300 mt-2">{item.details}</p>
          </div>
        </div>
        
        {item.time && (
          <div className="text-sm text-zinc-400">
            <span className="font-semibold">⏰</span> {item.time}
          </div>
        )}
        
        {item.location && (
          <div className="text-sm text-zinc-400">
            <span className="font-semibold">📍</span> {item.location}
          </div>
        )}
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-zinc-700 text-zinc-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-zinc-400">
            {item.interestedCount} interested
          </span>
          <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md font-semibold text-sm transition-colors">
            I&apos;m Interested
          </button>
        </div>
      </div>
    )
}
