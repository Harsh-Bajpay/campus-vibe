# Campus Vibe - Quick Start Guide

Get your Campus Vibe app running in 5 minutes! 🚀

## Prerequisites

- Node.js 18 or higher ([Download here](https://nodejs.org/))
- npm (comes with Node.js)
- A code editor (VS Code recommended)
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/Harsh-Bajpay/campus-vibe.git
cd campus-vibe
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all necessary packages including Next.js, React, and Tailwind CSS.

## Step 3: Run Development Server

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Campus Vibe app with a feed of events, study groups, resources, and smart suggestions!

## Step 4: Explore the App

- **Scroll through the feed** to see different card types
- **Try the filter pills** at the top (All, Events, Groups, Resources, Suggestions)
- **Click the buttons** on cards (they're interactive in the UI)
- **Check mobile responsiveness** by resizing your browser

## What You See

The app currently displays **mock data** with 8 sample items:
- 3 Events (Data Science Club, Movie Night, Career Fair)
- 2 Social Groups (CS101 Study Group, Pickup Frisbee)
- 2 Resources (Wellness Center, Library Hours)
- 1 Smart Suggestion (Machine Learning Study Group)

## Project Structure

```
campus-vibe/
├── app/
│   ├── page.js          # Main feed page
│   ├── layout.js        # App layout with header/footer
│   └── globals.css      # Global styles
├── components/
│   ├── EventCard.js     # Event display component
│   ├── SocialGroupCard.js
│   ├── ResourceCard.js
│   └── SuggestionCard.js
├── lib/
│   └── data.js          # Mock data
└── package.json         # Dependencies
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Customize the App

### Add Your Own Events

Edit `lib/data.js` and add new items to the `mockFeedData` array:

```javascript
{
  id: 9,
  type: 'EVENT',
  title: 'Your Event Title',
  details: 'Event description',
  time: 'When it happens',
  location: 'Where it happens',
  tags: ['Tag1', 'Tag2'],
  interestedCount: 0
}
```

### Change Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: '#6366f1',    // Change to your color
  secondary: '#10b981',   // Change to your color
  background: '#0a0a0a',
}
```

### Modify Components

Each card component in `components/` folder can be customized:
- Change button text
- Modify layouts
- Add new fields
- Adjust styling

## Deploy to Vercel (5 minutes)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project" → Import your repository
5. Click "Deploy"

Done! Your app is live. ✅

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Styling doesn't work
```bash
# Make sure Tailwind is properly configured
# Check that postcss.config.js exists
# Verify globals.css has @tailwind directives
```

## Next Steps

Now that you have the app running:

1. **Read the PRD**: Check [PRD.md](./PRD.md) for full product vision
2. **Add Features**: User authentication, real data, create forms
3. **Deploy**: Get it live for your campus community
4. **Get Feedback**: Show it to students and iterate

## Need Help?

- Check the [README.md](./README.md) for overview
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting options
- Review [PRD.md](./PRD.md) for feature specifications
- Open an issue on GitHub

---

**Built for hackathons. Ready for production.** 🎓
