# 🎓 Campus Vibe

A mobile-first hub that unifies campus life: a personalized feed of events, study groups, resources, and smart suggestions. Students onboard with major, courses, and interests; a matching engine clusters peers to spark study groups. Users create/join events and groups, mark interest, and convert suggestions into active communities—reducing fragmentation, boosting engagement, and fostering real, relevant connections.

## ✨ Features

### 🔐 Student Onboarding
- User registration and authentication with JWT
- Profile customization with major, year, courses, and interests
- Secure password hashing with bcrypt

### 📱 Personalized Feed
- Smart feed algorithm that surfaces relevant content
- Events, study groups, and resources tailored to your profile
- Relevance scoring based on courses and interests

### 📅 Event Management
- Create and browse campus events
- Mark interest or join events
- Filter by category and upcoming dates
- Track participant counts and event details

### 👥 Study Groups
- Create course-specific study groups
- Join groups with shared interests
- Set maximum member limits
- Track group membership and roles

### 🎯 Intelligent Matching Engine
- Find peers with shared courses and interests
- Match score algorithm for compatibility
- Discover potential study partners
- Build meaningful academic connections

### 💡 Smart Suggestions
- Personalized group recommendations based on courses
- Event suggestions matching your interests
- Convert suggestions into active participation
- Reduce campus life fragmentation

### 📚 Resource Sharing
- Share and discover academic resources
- Course-specific resource organization
- Track resource contributors

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Harsh-Bajpay/campus-vibe.git
cd campus-vibe
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=3000
JWT_SECRET=your-secure-secret-key
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

6. Open your browser and navigate to:
```
http://localhost:3000
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3 (Mobile-first responsive design)
- **Backend**: Node.js, Express.js
- **Database**: SQLite3 (easily replaceable with PostgreSQL/MySQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing

### Project Structure
```
campus-vibe/
├── server/
│   ├── server.js              # Main server file
│   ├── models/
│   │   └── database.js        # Database schema and initialization
│   ├── routes/
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── users.js          # User profile endpoints
│   │   ├── events.js         # Event management endpoints
│   │   ├── groups.js         # Study group endpoints
│   │   ├── matching.js       # Matching engine endpoints
│   │   └── feed.js           # Personalized feed endpoints
│   └── middleware/
│       └── auth.js           # JWT authentication middleware
├── public/
│   ├── index.html            # Main application HTML
│   ├── styles.css            # Responsive styles
│   └── app.js                # Frontend JavaScript
├── package.json
└── README.md
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users/:userId` - Get user by ID

### Events
- `GET /api/events` - List all events (with filters)
- `POST /api/events` - Create new event
- `GET /api/events/:eventId` - Get event details
- `POST /api/events/:eventId/join` - Join/mark interest in event
- `DELETE /api/events/:eventId/leave` - Leave event

### Study Groups
- `GET /api/groups` - List all study groups (with filters)
- `POST /api/groups` - Create new study group
- `GET /api/groups/:groupId` - Get group details
- `POST /api/groups/:groupId/join` - Join study group
- `DELETE /api/groups/:groupId/leave` - Leave study group

### Matching & Suggestions
- `GET /api/matching/peers` - Find matching peers for study groups
- `GET /api/matching/suggestions` - Get personalized suggestions
- `POST /api/matching/suggestions/:id/convert` - Convert suggestion to action

### Feed
- `GET /api/feed` - Get personalized feed

## 🎨 User Interface

The application features a clean, modern, mobile-first design with:
- Responsive layout that works on all devices
- Intuitive navigation with tabbed interface
- Card-based content display
- Modal dialogs for creating content
- Real-time feedback and loading states
- Color-coded badges and tags for categories

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API endpoints
- SQL injection prevention with parameterized queries
- CORS configuration
- Environment variable configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Harsh Bajpay

## 🙏 Acknowledgments

Campus Vibe was built to solve the real problem of fragmented campus life, helping students discover relevant events, form study groups, and build meaningful connections through intelligent matching and personalized recommendations.