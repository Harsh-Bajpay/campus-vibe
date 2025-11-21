# Campus Vibe – Product Requirements Document (PRD)

## 1. Executive Summary

**Campus Vibe** is a unified, intelligent hub for college life that consolidates events, study groups, campus resources, and peer discovery into a personalized feed ("Vibe Feed"). It reduces fragmentation, improves student engagement, and accelerates meaningful connections by combining structured campus data with lightweight social interaction and relevance matching.

### Vision
To create a single platform where college students can discover everything they need - events, study partners, resources, and social connections - eliminating the need to juggle multiple apps and portals.

### Target Audience
College and university students seeking to:
- Stay informed about campus events
- Find study partners and academic support
- Discover campus resources (wellness, career, etc.)
- Build meaningful social connections

## 2. Problem Statement

### Current Pain Points
1. **Fragmented Information**: Students must check multiple sources (email, portal, Discord, WhatsApp, bulletin boards) to stay informed
2. **Missed Opportunities**: Important events and resources get lost in the noise
3. **Social Isolation**: Difficulty finding peers with similar interests or academic needs
4. **Cognitive Overload**: Too many platforms and notifications to manage
5. **Lack of Personalization**: Generic information that isn't relevant to individual students

### Market Opportunity
- 20+ million college students in the US alone
- High smartphone penetration (95%+)
- Growing demand for unified digital experiences
- Post-pandemic emphasis on rebuilding campus community

## 3. Solution Overview

### Core Concept
A mobile-first web application featuring a personalized "Vibe Feed" that aggregates:
- Campus events with RSVP functionality
- Study groups and social communities
- Campus resources (wellness, career, academic support)
- AI-powered suggestions to connect students

### Key Differentiators
1. **Unified Experience**: Single platform vs. fragmented tools
2. **Smart Matching**: AI-powered suggestions based on courses + interests
3. **Contextual Relevance**: Personalized feed based on user profile
4. **Lightweight Interactions**: One-tap actions (interested, join, etc.)
5. **Student-Generated Content**: Any student can create events/groups

## 4. MVP Feature Set

### 4.1 User Onboarding
**Goal**: Capture preferences for personalization

**Features**:
- Email/password registration (OAuth for future)
- Profile setup: major, graduation year
- Course selection: current courses this semester
- Interest tagging: clubs, hobbies, activities (multi-select)

**Acceptance Criteria**:
- User can complete onboarding in < 2 minutes
- Minimum 3 interests selected
- At least 1 course selected

### 4.2 The Vibe Feed (Home Screen)
**Goal**: Present personalized, actionable content

**Features**:
- Scrollable card-based feed
- Four card types: Events, Social Groups, Resources, Suggestions
- Filter pills: All, Events, Groups, Resources, Suggestions
- Pull-to-refresh functionality
- Real-time item counter

**Card Components**:

**Event Card**:
- Title, description
- Date/time, location
- Tags (topics)
- Interest count
- "I'm Interested" button

**Social Group Card**:
- Title, description
- Associated course (if study group)
- Tags
- Member count / capacity
- "Request to Join" button

**Resource Card**:
- Title, description
- Location (if physical)
- Tags
- "Learn More" button

**Suggestion Card**:
- AI-generated connection prompt
- Course context
- Number of matching students
- Tags showing common interests
- "Yes, Let's Connect!" and "Not Now" buttons

**Acceptance Criteria**:
- Feed loads in < 2 seconds
- Cards display all required information
- Buttons are interactive (even if non-functional in MVP)
- Responsive design (mobile + desktop)

### 4.3 Content Creation
**Goal**: Enable students to create events and groups

**Features** (Future Phase):
- "Create" button (floating action button)
- Event creation form: title, description, date, time, location, tags
- Group creation form: title, description, course (optional), tags, capacity

**Acceptance Criteria**:
- Form validation (required fields)
- Created items appear in feed immediately
- Tags are searchable

### 4.4 Smart Suggestions Engine
**Goal**: Proactively connect students with relevant peers

**Algorithm (Rule-Based for MVP)**:
```
FOR each user:
  FOR each course they're taking:
    FIND other users in same course
    IF 3+ users share course AND ≥1 common interest:
      CREATE suggestion card
      PROMPT: "Start a [course] study group with [N] others who like [interest]?"
```

**Suggestion Types**:
- Study group formation (course + interest match)
- Social activity (interest match, no course required)

**Acceptance Criteria**:
- Suggestions generated at least once per day
- Maximum 3 suggestions shown per user at a time
- Users can dismiss suggestions

## 5. Technical Architecture

### 5.1 Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (auto-deploy)
- **Database** (Future): Supabase or Firebase
- **Authentication** (Future): NextAuth.js or Supabase Auth

### 5.2 Data Models

**User**:
```javascript
{
  id: string,
  email: string,
  major: string,
  gradYear: number,
  courses: string[],
  interests: string[],
  createdAt: timestamp
}
```

**Event**:
```javascript
{
  id: string,
  creatorId: string,
  title: string,
  description: string,
  startTime: timestamp,
  location: string,
  tags: string[],
  interestedUserIds: string[],
  createdAt: timestamp
}
```

**SocialGroup**:
```javascript
{
  id: string,
  creatorId: string,
  title: string,
  description: string,
  course: string | null,
  tags: string[],
  capacity: number,
  memberIds: string[],
  createdAt: timestamp
}
```

**Resource**:
```javascript
{
  id: string,
  title: string,
  description: string,
  location: string,
  tags: string[],
  createdAt: timestamp
}
```

**Suggestion**:
```javascript
{
  id: string,
  type: 'STUDY_GROUP' | 'SOCIAL_ACTIVITY',
  course: string | null,
  userIds: string[],
  commonInterests: string[],
  status: 'ACTIVE' | 'ACCEPTED' | 'DISMISSED',
  createdAt: timestamp
}
```

### 5.3 API Endpoints (Future)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/feed` - Get personalized feed
- `POST /api/events` - Create event
- `POST /api/groups` - Create group
- `POST /api/events/:id/interested` - Express interest
- `POST /api/groups/:id/join` - Request to join
- `POST /api/suggestions/:id/accept` - Accept suggestion
- `POST /api/suggestions/:id/dismiss` - Dismiss suggestion

## 6. User Flows

### Primary Flow: Browse and Interact
1. User logs in → sees Vibe Feed
2. User scrolls through cards
3. User sees interesting event → taps "I'm Interested"
4. System logs interest, updates counter
5. User continues browsing

### Smart Suggestion Flow
1. System identifies 3 users: same CS101 course, all like "AI Club"
2. System generates suggestion card for all 3
3. User A sees suggestion: "Start CS101 study group with 2 others?"
4. User A taps "Yes, Let's Connect!"
5. System creates new Social Group, notifies User B and User C
6. Group appears in all users' feeds

### Content Creation Flow (Future)
1. User taps "+" button
2. Selects "Create Event" or "Create Group"
3. Fills form (title, description, etc.)
4. Taps "Create"
5. Item appears in feed, visible to matched users

## 7. Success Metrics (MVP)

### Engagement
- **Daily Active Users (DAU)**: Target 40%+ of registered users
- **Session Length**: Average 5+ minutes
- **Feed Interactions**: 3+ clicks per session

### Feature Adoption
- **Interest Click Rate**: 20%+ of events get interactions
- **Join Request Rate**: 15%+ of groups get requests
- **Suggestion Acceptance Rate**: 10%+ (ambitious for MVP)

### Growth
- **User Registration**: 100+ in first week (campus pilot)
- **Retention**: 50%+ D7 retention
- **Viral Coefficient**: 0.3+ (invitation/sharing feature)

## 8. Future Enhancements

### Phase 2: Real-Time & Notifications
- Push notifications for relevant events
- Real-time updates to feed
- Live chat for groups
- Calendar integration (Google, Apple)

### Phase 3: Advanced AI
- ML-based recommendation scoring (not just rules)
- Natural language processing for event categorization
- Predictive notifications ("You might like this event")
- Sentiment analysis for community health

### Phase 4: Platform Features
- Progressive Web App (PWA) with offline support
- Native mobile apps (iOS, Android)
- Campus admin dashboard
- Analytics for event organizers
- Verification system (official vs. student-created)

### Phase 5: Expansion
- Multi-campus support
- Inter-campus events (for nearby schools)
- Alumni network integration
- Corporate partnerships (career fairs, recruiting)

## 9. Design Principles

### User Experience
1. **Speed**: Feed loads instantly, interactions feel immediate
2. **Simplicity**: One-tap actions, minimal navigation
3. **Clarity**: Clear visual hierarchy, scannable cards
4. **Delight**: Smooth animations, playful micro-interactions

### Visual Design
- **Dark Theme**: Modern, reduces eye strain, saves battery
- **Color Coding**: 
  - Blue (Events)
  - Green (Social Groups)
  - Amber (Resources)
  - Purple (AI Suggestions)
- **Typography**: Clean, readable sans-serif (Inter font)
- **Spacing**: Generous padding, clear card separation

## 10. Risks & Mitigation

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Slow feed loading | High | Implement caching, optimize queries |
| Suggestion algorithm fails | Medium | Fall back to simple recent items |
| Security vulnerabilities | High | Regular audits, secure authentication |

### Product Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Low adoption | High | Campus ambassador program, demo events |
| Spam/abuse | Medium | Reporting system, moderation tools |
| Privacy concerns | High | Clear privacy policy, minimal data collection |

### Go-To-Market Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Competing with established tools | High | Focus on integration, not replacement |
| Network effects needed | High | Launch with cohort (e.g., freshman class) |

## 11. Launch Strategy

### Phase 1: Campus Pilot (Weeks 1-4)
- Partner with 1-2 student organizations
- Pre-populate 20+ events
- 100-user beta test
- Gather feedback via surveys

### Phase 2: Soft Launch (Weeks 5-8)
- Open to full campus
- Social media campaign
- Referral system
- Track metrics closely

### Phase 3: Scale (Weeks 9-12)
- Multi-campus expansion
- Press outreach
- Partnership discussions
- Feature iteration based on data

## 12. Appendix

### Competitive Analysis
- **Existing Solutions**: University portals, Facebook Events, Discord servers, GroupMe
- **Campus Vibe Advantage**: Unified, personalized, AI-powered, mobile-first

### User Personas

**Persona 1: "Academic Aisha"**
- Freshman CS major
- Goals: Find study groups, attend tech talks
- Pain: Doesn't know many people yet
- Campus Vibe Use: Joins CS101 study group via suggestion, discovers Data Science Club

**Persona 2: "Social Sam"**
- Junior, undecided major
- Goals: Make friends, try new activities
- Pain: Misses event announcements
- Campus Vibe Use: Browses feed daily, RSVPs to pickup frisbee and movie nights

**Persona 3: "Leader Liam"**
- Senior, club president
- Goals: Promote events, recruit members
- Pain: Low turnout despite marketing efforts
- Campus Vibe Use: Creates events in app, reaches students who've tagged relevant interests

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Owner**: Campus Vibe Team  
**Status**: Active Development (MVP)
