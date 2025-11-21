export default function SocialGroupCard({ item }) {
    return (
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 space-y-2 hover:border-secondary transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="font-semibold text-xs uppercase tracking-wider text-secondary mb-1">
                        Social Group
                    </div>
                    <h3 className="font-bold text-lg text-white">{item.title}</h3>
                    <p className="text-zinc-300 mt-2">{item.details}</p>
                </div>
            </div>
            
            {item.course && (
                <div className="text-sm text-zinc-400">
                    <span className="font-semibold">📚</span> Course: {item.course}
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
                    {item.memberCount}{item.capacity ? `/${item.capacity}` : ''} members
                </span>
                <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-white rounded-md font-semibold text-sm transition-colors">
                    Request to Join
                </button>
            </div>
        </div>
    )
}
