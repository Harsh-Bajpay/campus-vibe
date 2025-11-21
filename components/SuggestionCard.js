export default function SuggestionCard({ item }) {
    return (
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/50 rounded-lg p-4 space-y-2 hover:border-purple-400 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="font-semibold text-xs uppercase tracking-wider text-purple-400 mb-1">
                        ✨ Smart Suggestion
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
            
            {item.suggestedMembers && (
                <div className="text-sm text-purple-300">
                    <span className="font-semibold">👥</span> {item.suggestedMembers} students match your interests
                </div>
            )}
            
            {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-purple-700/50 text-purple-200 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            
            <div className="flex gap-2 pt-2">
                <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold text-sm transition-colors">
                    Yes, Let&apos;s Connect!
                </button>
                <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md font-semibold text-sm transition-colors">
                    Not Now
                </button>
            </div>
        </div>
    )
}
