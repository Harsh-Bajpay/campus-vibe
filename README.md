# Campus Vibe 🎓

**Your College Experience, Unified.**

Campus Vibe is a unified, AI-powered platform that acts as the central nervous system for college life. It integrates academic, social, and administrative information into a single, personalized feed, connecting students with relevant opportunities and people.

## 🌟 Features

- **The "Vibe" Feed**: A dynamic, scrollable feed showing a personalized mix of:
  - **Event Cards**: Campus events with time, location, and interest tracking
  - **Social Group Cards**: Study groups and interest-based communities
  - **Resource Cards**: Campus wellness, career, and academic resources
  - **Smart Suggestions**: AI-powered recommendations to connect students with similar interests

- **Personalized Experience**: Content tailored to your major, courses, and interests
- **One-Tap Interactions**: Quick actions like "I'm Interested", "Request to Join", and "Learn More"
- **Modern UI**: Beautiful, responsive design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Harsh-Bajpay/campus-vibe.git
cd campus-vibe

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Deployment on Vercel

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Add New..." → "Project"
4. Import your `campus-vibe` repository
5. Click "Deploy"

That's it! Vercel will automatically detect Next.js and deploy your app.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Harsh-Bajpay/campus-vibe)

## 🏗️ Project Structure

```
campus-vibe/
├── app/
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.js         # Root layout with header and footer
│   └── page.js           # Main feed page
├── components/
│   ├── EventCard.js      # Event display component
│   ├── SocialGroupCard.js # Study group display component
│   ├── ResourceCard.js   # Campus resource display component
│   └── SuggestionCard.js # AI suggestion display component
├── lib/
│   └── data.js           # Mock data for development
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18
- **Styling**: Tailwind CSS
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel

## 🎨 Design System

### Colors
- **Primary**: `#6366f1` (Indigo) - Used for events and main actions
- **Secondary**: `#10b981` (Emerald) - Used for social groups
- **Accent**: `#f59e0b` (Amber) - Used for resources
- **Background**: Dark theme with zinc colors

### Components
- Event cards with blue accent
- Social group cards with green accent
- Resource cards with amber accent
- Suggestion cards with purple gradient

## 📱 Core User Flows

1. **Browse Feed**: Students see a personalized mix of content
2. **Express Interest**: One-tap to show interest in events
3. **Join Groups**: Request to join study groups or communities
4. **Discover Resources**: Find campus support services
5. **Smart Connections**: Receive AI-powered suggestions to connect with peers

## 🔮 Future Enhancements

- User authentication and profiles
- Real-time updates and notifications
- Event creation interface
- Study group chat functionality
- Advanced AI matching algorithms
- Calendar integration
- Push notifications
- Progressive Web App (PWA) support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Contact

Built with ❤️ for college students everywhere.

---

**Note**: This is a prototype/MVP version. The AI matching and backend features are simulated with mock data for demonstration purposes.