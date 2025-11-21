import './globals.css'

export const metadata = {
  title: 'Campus Vibe - Your College Experience, Unified',
  description: 'A unified platform for college events, study groups, and campus resources',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-zinc-900">
          <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-primary">Campus Vibe</h1>
              <p className="text-sm text-zinc-400">Your College Experience, Unified</p>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </main>
          <footer className="bg-zinc-950 border-t border-zinc-800 mt-12">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
              © 2024 Campus Vibe. Built for hackathon.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
