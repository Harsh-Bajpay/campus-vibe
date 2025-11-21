export default function ResourceCard({ item }) {
    return (
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 space-y-2 hover:border-amber-500 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="font-semibold text-xs uppercase tracking-wider text-amber-500 mb-1">
                        Campus Resource
                    </div>
                    <h3 className="font-bold text-lg text-white">{item.title}</h3>
                    <p className="text-zinc-300 mt-2">{item.details}</p>
                </div>
            </div>
            
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
            
            <div className="pt-2">
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-semibold text-sm transition-colors w-full">
                    Learn More
                </button>
            </div>
        </div>
    )
}
