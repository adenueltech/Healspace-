# HealSpace 🧠💚

> A comprehensive mental health platform connecting individuals with peer support, professional therapy, and wellness tools in a safe, anonymous environment.

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

## 🌟 Problem Statement

Mental health challenges affect millions worldwide, yet many face significant barriers to seeking help:

- **Stigma and Isolation**: Fear of judgment prevents people from opening up about their struggles
- **Limited Access**: High cost and long wait times for professional therapy
- **Lack of Community**: Difficulty finding others who understand similar experiences
- **Inconsistent Support**: No comprehensive platform for tracking mental wellness journey
- **Privacy Concerns**: Worries about data security and anonymity in digital health platforms

## 💡 Solution

HealSpace addresses these challenges by providing a comprehensive, anonymous mental health ecosystem that combines:

- **Anonymous Peer Support**: Safe, judgment-free conversations with others facing similar challenges
- **Professional Therapy**: Affordable access to licensed therapists through various communication methods
- **Community Groups**: Topic-specific support groups moderated by trained volunteers
- **Wellness Tools**: Mood tracking, journaling, progress monitoring, and mindfulness resources
- **Privacy-First Design**: Robust privacy controls and anonymous participation options

## 📋 About HealSpace

HealSpace is a modern mental health platform built to make mental wellness accessible, affordable, and stigma-free. Our platform serves as a bridge between traditional therapy and community support, offering users multiple pathways to healing.

### Key Features

#### 🤝 Anonymous Chat
- Connect with peers in real-time anonymous conversations
- Trained moderators ensure safe, supportive environment
- No personal information required to participate

#### 👥 Support Groups
- Join topic-specific communities (Anxiety, Depression, Work Stress, etc.)
- Public and private groups available
- Scheduled sessions with facilitators

#### 📓 Digital Journal
- Private journaling with mood tracking
- Tag entries for better organization
- Insights and patterns analysis

#### 😊 Mood Tracker
- Daily mood logging with contextual factors
- Visual progress charts and trends
- Identify triggers and patterns

#### 📈 Progress Dashboard
- Comprehensive wellness goals tracking
- Achievement system with badges
- Timeline of mental health journey

#### 👨‍⚕️ Professional Therapy
- Book sessions with licensed therapists
- Video, phone, and chat options
- Affordable pricing with insurance integration

#### 🔒 Privacy Controls
- Granular privacy settings
- Hide personal information selectively
- Anonymous mode for complete privacy

## 🎯 Target Audience

### Primary Users
- **Individuals with Mental Health Concerns**: People experiencing anxiety, depression, stress, or other mental health challenges
- **Students**: College and high school students dealing with academic pressure and life transitions
- **Working Professionals**: Employees managing work-life balance and workplace stress
- **Survivors**: Individuals recovering from trauma or major life changes

### Secondary Users
- **Mental Health Professionals**: Therapists and counselors looking to expand their practice
- **Support Group Facilitators**: Trained volunteers moderating community discussions
- **Caregivers and Family**: People supporting loved ones with mental health journeys
- **Organizations**: Companies and institutions providing employee wellness programs

### Demographics
- **Age**: 18-65+ years
- **Tech-Savvy**: Comfortable with mobile and web applications
- **Geographic**: Global reach with localized content and language support
- **Socioeconomic**: All income levels with sliding scale pricing options

## 🛠️ Technical Architecture

### Frontend (HealSpace Web App)
```
Technology Stack:
├── Framework: Next.js 13+ (App Router)
├── Language: TypeScript
├── Styling: Tailwind CSS + shadcn/ui
├── State Management: React Hooks + Context
├── Real-time: Socket.io Client
├── Authentication: JWT
├── Forms: React Hook Form + Zod
└── Deployment: Vercel
```

### Backend (HealSpace API)
```
Technology Stack:
├── Framework: NestJS
├── Language: TypeScript
├── Database: PostgreSQL
├── ORM: TypeORM
├── Authentication: Passport + JWT
├── Validation: class-validator
├── Documentation: Swagger/OpenAPI
├── Real-time: Socket.io
├── File Upload: Multer + Cloudinary
├── Caching: Redis
└── Deployment: Docker + Railway/AWS
```

### Database Schema

#### Core Entities
- **Users**: Profile management with privacy controls
- **Support Groups**: Community spaces with membership
- **Chat Messages**: Anonymous messaging system
- **Journal Entries**: Personal reflections with metadata
- **Mood Entries**: Daily mood tracking with factors
- **Therapy Sessions**: Professional appointment management
- **Achievements**: Gamification and progress tracking

### Key Technical Features

#### 🔐 Security & Privacy
- End-to-end encryption for sensitive communications
- GDPR and HIPAA compliance
- Anonymous user modes with pseudonym support
- Secure file upload with virus scanning
- Rate limiting and DDoS protection

#### ⚡ Performance
- Global CDN for static assets
- Database query optimization with indexes
- Redis caching for frequently accessed data
- Lazy loading and code splitting
- Progressive Web App (PWA) capabilities

#### 🔄 Real-time Features
- WebSocket connections for live chat
- Real-time group updates
- Live session notifications
- Instant messaging with typing indicators

#### 📱 Responsive Design
- Mobile-first approach
- Cross-platform compatibility
- Accessibility (WCAG 2.1 AA compliant)
- Dark/light theme support
- Internationalization ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis (optional, for caching)
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/healspace-web.git
   cd healspace-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_WS_URL=ws://localhost:3001
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Backend Setup

1. **Clone the backend repository**
   ```bash
   git clone https://github.com/your-org/healspace-api.git
   cd healspace-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database setup**
   ```bash
   # Create PostgreSQL database
   createdb healspace

   # Run migrations
   npm run migration:run
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_DATABASE=healspace

   JWT_SECRET=your-super-secret-jwt-key
   ```

5. **Run development server**
   ```bash
   npm run start:dev
   ```

## 📁 Project Structure

```
healspace-web/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── dashboard/                # Protected dashboard pages
│   │   ├── chat/                 # Anonymous chat
│   │   ├── groups/               # Support groups
│   │   ├── journal/              # Journal entries
│   │   ├── mood/                 # Mood tracking
│   │   ├── progress/             # Progress dashboard
│   │   ├── sessions/             # Therapy sessions
│   │   ├── settings/             # User settings
│   │   └── profile/              # User profile
│   ├── api/                      # API routes (if needed)
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── dashboard/                # Dashboard-specific components
│   └── [feature]/                # Feature-specific components
├── lib/                          # Utilities and configurations
├── public/                       # Static assets
├── styles/                       # Additional styles
└── types/                        # TypeScript type definitions
```

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Backend
npm run start:dev    # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run migration:run # Run database migrations
```

### Code Quality

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit messages

### Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Backend Deployment (Railway/Docker)

```bash
# Build Docker image
docker build -t healspace-api .

# Run with Docker Compose
docker-compose up -d
```

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.healspace.com
NEXT_PUBLIC_WS_URL=wss://api.healspace.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

#### Backend (.env)
```env
NODE_ENV=production
DB_HOST=your_db_host
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=healspace

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

REDIS_HOST=your_redis_host
REDIS_PORT=6379

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Mental health professionals and organizations for their guidance
- Open source community for the amazing tools and libraries
- Beta testers and early adopters for their valuable feedback
- Everyone working to reduce mental health stigma worldwide

## 📞 Support

- **Documentation**: [docs.healspace.com](https://docs.healspace.com)
- **Community**: [community.healspace.com](https://community.healspace.com)
- **Email**: support@healspace.com
- **Emergency**: If you're in crisis, please contact your local emergency services or call a crisis hotline

---

**HealSpace** - Because mental health matters, and no one should face it alone. 💚

*Made with ❤️ for mental wellness worldwide*
