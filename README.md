# Campus Vibe 🎓

A vibrant campus community application built with Next.js, connecting students, events, and resources in one unified platform.

## Features

- 🎯 **Event Management**: Discover and manage campus events
- 👥 **Student Community**: Join clubs and connect with peers
- 📚 **Resource Hub**: Access study materials and academic support
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🌙 **Dark Mode**: Full dark mode support
- 📱 **Mobile Friendly**: Optimized for all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Harsh-Bajpay/campus-vibe.git

# Navigate to project directory
cd campus-vibe

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment on Vercel

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Harsh-Bajpay/campus-vibe)

## Project Structure

```
campus-vibe/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── community/         # Community page
│   ├── events/            # Events page
│   ├── resources/         # Resources page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── Footer.tsx
├── public/                # Static assets
└── next.config.mjs        # Next.js configuration

```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ for campus communities worldwide