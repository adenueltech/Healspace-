# HealSpace Backend API Documentation

## Overview

HealSpace is a comprehensive mental health platform built with NestJS, TypeORM, and PostgreSQL. This documentation provides a complete guide for backend developers to implement the API that supports the frontend application.

## Tech Stack

- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **WebSocket**: Socket.io (for real-time chat)

## Project Structure

```
src/
├── auth/                    # Authentication module
├── users/                   # User management
├── chat/                    # Anonymous chat system
├── groups/                  # Support groups
├── journal/                 # Journal entries
├── mood/                    # Mood tracking
├── progress/                # Progress tracking
├── sessions/                # Therapy sessions
├── notifications/           # Push notifications
├── common/                  # Shared utilities
├── config/                  # Configuration
└── main.ts
```

## Database Schema

### User Entity

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  occupation?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ default: false })
  isAnonymous: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', default: {} })
  privacySettings: {
    hideDateOfBirth: boolean;
    hidePhone: boolean;
    hideLocation: boolean;
    hideOccupation: boolean;
    hideInterests: boolean;
    anonymousMode: boolean;
    showActivity: boolean;
    allowMessages: boolean;
  };

  @Column({ type: 'simple-array', default: [] })
  interests: string[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => JournalEntry, journal => journal.user)
  journalEntries: JournalEntry[];

  @OneToMany(() => MoodEntry, mood => mood.user)
  moodEntries: MoodEntry[];

  @OneToMany(() => ChatMessage, message => message.sender)
  sentMessages: ChatMessage[];

  @ManyToMany(() => SupportGroup)
  @JoinTable()
  joinedGroups: SupportGroup[];

  @OneToMany(() => TherapySession, session => session.client)
  therapySessions: TherapySession[];
}
```

### Support Group Entity

```typescript
@Entity('support_groups')
export class SupportGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  category: string;

  @Column({ default: 'public' })
  privacy: 'public' | 'private';

  @Column({ default: 0 })
  memberCount: number;

  @Column({ default: 0 })
  onlineCount: number;

  @Column({ nullable: true })
  nextSession?: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User)
  createdBy: User;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @OneToMany(() => GroupMessage, message => message.group)
  messages: GroupMessage[];
}
```

### Chat Message Entity

```typescript
@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  isAnonymous: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User, { nullable: true })
  recipient?: User;

  @ManyToOne(() => SupportGroup, { nullable: true })
  group?: SupportGroup;
}
```

### Journal Entry Entity

```typescript
@Entity('journal_entries')
export class JournalEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  mood: 'happy' | 'neutral' | 'sad';

  @Column({ type: 'simple-array', default: [] })
  tags: string[];

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;
}
```

### Mood Entry Entity

```typescript
@Entity('mood_entries')
export class MoodEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  mood: number; // 1-5 scale

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'simple-array', default: [] })
  factors: string[];

  @Column()
  date: Date;

  @ManyToOne(() => User)
  user: User;
}
```

### Therapy Session Entity

```typescript
@Entity('therapy_sessions')
export class TherapySession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column()
  scheduledAt: Date;

  @Column({ default: 50 })
  duration: number; // minutes

  @Column({ default: 'scheduled' })
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';

  @Column({ nullable: true })
  rating?: number;

  @Column({ default: 'video' })
  type: 'video' | 'phone' | 'chat';

  @ManyToOne(() => User)
  client: User;

  @ManyToOne(() => User)
  therapist: User;
}
```

## Authentication

### JWT Strategy

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

## API Endpoints

### Authentication Endpoints

#### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "dateOfBirth": "1990-05-15",
  "anonymous": false
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isAnonymous": false
  }
}
```

#### POST /auth/signin
Authenticate user login.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Same as signup.

#### POST /auth/social-login
Handle social authentication (Google, GitHub).

**Request Body:**
```json
{
  "provider": "google",
  "token": "social_provider_token"
}
```

### User Management Endpoints

#### GET /users/profile
Get current user profile.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "dateOfBirth": "1990-05-15",
  "location": "San Francisco, CA",
  "occupation": "Software Engineer",
  "bio": "Passionate about mental health...",
  "interests": ["Mental Health", "Technology"],
  "privacySettings": {
    "hideDateOfBirth": true,
    "anonymousMode": false
  }
}
```

#### PUT /users/profile
Update user profile.

**Request Body:** Partial user data.

#### PUT /users/privacy
Update privacy settings.

**Request Body:**
```json
{
  "hideDateOfBirth": true,
  "anonymousMode": true,
  "allowMessages": false
}
```

### Chat Endpoints

#### GET /chat/conversations
Get user's chat conversations.

**Response:**
```json
[
  {
    "id": "uuid",
    "partner": {
      "id": "uuid",
      "name": "Anonymous User #2847",
      "online": true
    },
    "lastMessage": "Thank you for listening",
    "timestamp": "2025-01-08T10:30:00Z",
    "unreadCount": 2
  }
]
```

#### GET /chat/conversations/:id/messages
Get messages for a specific conversation.

**Query Parameters:**
- `limit`: Number of messages to return (default: 50)
- `before`: Cursor for pagination

**Response:**
```json
[
  {
    "id": "uuid",
    "content": "Hi, I've been struggling lately",
    "sender": {
      "id": "uuid",
      "name": "Anonymous User #2847"
    },
    "timestamp": "2025-01-08T10:30:00Z",
    "isAnonymous": true
  }
]
```

#### POST /chat/messages
Send a new message.

**Request Body:**
```json
{
  "content": "Hello, I'm here to listen",
  "recipientId": "uuid",
  "isAnonymous": true
}
```

#### POST /chat/start
Start a new anonymous chat session.

**Response:**
```json
{
  "conversationId": "uuid",
  "partner": {
    "id": "uuid",
    "name": "Anonymous User #2847"
  }
}
```

### Support Groups Endpoints

#### GET /groups
Get available support groups.

**Query Parameters:**
- `category`: Filter by category
- `search`: Search query
- `joined`: Filter by joined status

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Anxiety Support Circle",
    "description": "A safe space for anxiety discussions",
    "category": "Anxiety",
    "privacy": "public",
    "memberCount": 234,
    "onlineCount": 12,
    "nextSession": "2025-01-10T15:00:00Z",
    "joined": true
  }
]
```

#### POST /groups/:id/join
Join a support group.

#### DELETE /groups/:id/leave
Leave a support group.

#### GET /groups/:id/messages
Get group messages.

**Response:** Similar to chat messages.

#### POST /groups/:id/messages
Send message to group.

### Journal Endpoints

#### GET /journal/entries
Get user's journal entries.

**Query Parameters:**
- `mood`: Filter by mood
- `tags`: Filter by tags
- `date`: Filter by date range
- `search`: Search in content

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Feeling Better Today",
    "content": "Had a great therapy session...",
    "mood": "happy",
    "tags": ["therapy", "progress"],
    "createdAt": "2025-01-08T09:00:00Z",
    "isFavorite": false
  }
]
```

#### POST /journal/entries
Create new journal entry.

**Request Body:**
```json
{
  "title": "My Journal Entry",
  "content": "Today was a good day...",
  "mood": "happy",
  "tags": ["work", "progress"]
}
```

#### PUT /journal/entries/:id
Update journal entry.

#### DELETE /journal/entries/:id
Delete journal entry.

#### POST /journal/entries/:id/favorite
Toggle favorite status.

### Mood Tracking Endpoints

#### GET /mood/entries
Get mood entries.

**Query Parameters:**
- `startDate`: Start date for range
- `endDate`: End date for range

**Response:**
```json
[
  {
    "id": "uuid",
    "mood": 4,
    "note": "Had a productive day",
    "factors": ["Sleep Quality", "Exercise"],
    "date": "2025-01-08"
  }
]
```

#### POST /mood/entries
Create mood entry.

**Request Body:**
```json
{
  "mood": 4,
  "note": "Feeling good today",
  "factors": ["Exercise", "Social Connection"],
  "date": "2025-01-08"
}
```

#### GET /mood/stats
Get mood statistics.

**Response:**
```json
{
  "averageMood": 3.8,
  "totalEntries": 28,
  "moodDistribution": {
    "amazing": 5,
    "good": 12,
    "okay": 8,
    "notGreat": 2,
    "difficult": 1
  },
  "trends": {
    "lastWeek": 4.2,
    "lastMonth": 3.8,
    "improvement": true
  }
}
```

### Progress Tracking Endpoints

#### GET /progress/goals
Get user's wellness goals.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Daily Meditation",
    "description": "Meditate for 10 minutes every day",
    "progress": 75,
    "current": 21,
    "target": 28,
    "unit": "days",
    "category": "Mindfulness",
    "streak": 7
  }
]
```

#### POST /progress/goals
Create new goal.

#### PUT /progress/goals/:id
Update goal progress.

#### GET /progress/achievements
Get user achievements.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "First Step",
    "description": "Completed your first journal entry",
    "icon": "BookOpen",
    "unlocked": true,
    "date": "2024-12-15"
  }
]
```

#### GET /progress/timeline
Get progress timeline.

**Response:**
```json
[
  {
    "date": "2025-01-08",
    "title": "Completed Anxiety Workshop",
    "description": "Learned new coping strategies",
    "type": "achievement"
  }
]
```

### Therapy Sessions Endpoints

#### GET /sessions
Get user's therapy sessions.

**Query Parameters:**
- `status`: Filter by status (upcoming, past)
- `therapist`: Filter by therapist

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Weekly Therapy Session",
    "therapist": {
      "id": "uuid",
      "name": "Dr. Sarah Johnson",
      "specialty": "Anxiety & Depression"
    },
    "scheduledAt": "2025-01-10T14:00:00Z",
    "duration": 50,
    "type": "video",
    "status": "confirmed"
  }
]
```

#### POST /sessions
Book new therapy session.

**Request Body:**
```json
{
  "therapistId": "uuid",
  "scheduledAt": "2025-01-15T10:00:00Z",
  "type": "video",
  "notes": "Initial consultation"
}
```

#### PUT /sessions/:id
Update session (reschedule, cancel).

#### POST /sessions/:id/rate
Rate completed session.

**Request Body:**
```json
{
  "rating": 5,
  "feedback": "Great session, very helpful"
}
```

#### GET /therapists
Get available therapists.

**Query Parameters:**
- `specialty`: Filter by specialty
- `availability`: Filter by availability

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Dr. Sarah Johnson",
    "specialty": "Anxiety & Depression",
    "experience": "12 years",
    "rating": 4.9,
    "nextAvailable": "2025-01-10T14:00:00Z",
    "hourlyRate": 150
  }
]
```

## WebSocket Events

### Chat Events

#### Connection
```typescript
io.on('connection', (socket) => {
  // Join user's room
  socket.join(`user_${userId}`);
});
```

#### Send Message
```typescript
socket.emit('sendMessage', {
  recipientId: 'uuid',
  content: 'Hello!',
  isAnonymous: true
});
```

#### Receive Message
```typescript
socket.on('newMessage', (message) => {
  // Handle incoming message
});
```

#### Join Group
```typescript
socket.emit('joinGroup', { groupId: 'uuid' });
```

#### Group Message
```typescript
socket.on('groupMessage', (message) => {
  // Handle group message
});
```

## File Upload

### Profile Picture Upload

#### POST /upload/profile-picture
Upload user profile picture.

**Content-Type:** multipart/form-data

**Response:**
```json
{
  "url": "https://cdn.healspace.com/profiles/uuid.jpg",
  "filename": "profile-uuid.jpg"
}
```

## Notifications

### Push Notifications

#### POST /notifications/send
Send push notification to user.

**Request Body:**
```json
{
  "userId": "uuid",
  "title": "Session Reminder",
  "body": "Your therapy session starts in 30 minutes",
  "type": "session_reminder"
}
```

## Error Handling

### Standard Error Response

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `422`: Unprocessable Entity
- `500`: Internal Server Error

## Security Considerations

1. **JWT Tokens**: Use secure, short-lived tokens
2. **Password Hashing**: Use bcrypt with salt rounds
3. **Input Validation**: Validate all inputs with class-validator
4. **Rate Limiting**: Implement rate limiting on auth endpoints
5. **CORS**: Configure CORS properly
6. **HTTPS**: Always use HTTPS in production
7. **Data Encryption**: Encrypt sensitive data at rest
8. **Audit Logging**: Log all authentication attempts

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=healspace
DB_PASSWORD=password
DB_DATABASE=healspace

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1h

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# WebSocket
WS_PORT=3001

# Redis (for caching and sessions)
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Deployment

### Docker Setup

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=healspace
      - POSTGRES_USER=healspace
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  postgres_data:
```

## Testing

### Unit Tests

```typescript
describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: jest.fn(() => ({
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          })),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockRepository = module.get(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    // Test implementation
  });
});
```

### E2E Tests

```typescript
describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      })
      .expect(201);
  });
});
```

## Monitoring and Logging

### Winston Logger Setup

```typescript
const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});
```

### Health Checks

```typescript
@Controller('health')
export class HealthController {
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.redis.pingCheck('redis'),
    ]);
  }
}
```

This documentation provides a comprehensive guide for implementing the HealSpace backend. The API is designed to be RESTful, secure, and scalable to support the mental health platform's features.