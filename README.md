# RU-BAN CONNECT - Agricultural Marketplace Platform

A modern, full-stack agricultural marketplace platform built with Next.js, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

- **Dual User Roles**: Producers and Consumers
- **Product Management**: CRUD operations for agricultural products
- **Order System**: Complete order lifecycle management
- **Authentication**: Secure user registration and login
- **Dashboard Analytics**: Role-based statistics and insights
- **Responsive Design**: Mobile-first approach with stunning animations
- **Real-time Updates**: Live order status tracking

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, TypeScript, TailwindCSS, Framer Motion, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Custom JWT-based auth (ready for NextAuth.js)
- **Validation**: Zod schemas
- **Deployment**: Vercel-ready

## 📦 Installation & Setup

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm or yarn

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd ruban_connect
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ruban_connect?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 4. Authentication (Phase 3)

This project uses NextAuth.js with the Prisma adapter for user login and registration.

1. **Install dependencies**
   ```bash
   npm install next-auth @next-auth/prisma-adapter bcrypt
   ```
2. **Configure NextAuth**
   - See `src/app/api/auth/[...nextauth]/route.ts` for provider and callback setup.
   - Environment variables `NEXTAUTH_URL` and `NEXTAUTH_SECRET` must be set.
3. **Prisma client**
   - The real Prisma client lives in `src/lib/prisma.ts` (generated via `npx prisma generate`).
4. **Pages**
   - `/login` uses `signIn("credentials")` to authenticate users.
   - `/signup/producer` and `/signup/consumer` POST to `/api/auth/register`.
   - Navbar shows login/sign up when unauthenticated; logout button when signed in.
5. **Session access**
   - Use `useSession()` on client components or `getServerSession()` on server components.

Once authentication is working you can protect routes and tie actions (orders,
products) to the current user.

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "PRODUCER" // or "CONSUMER"
}
```

**Response:**

```json
{
  "message": "User created successfully",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "PRODUCER"
  }
}
```

#### POST `/api/auth/login`

Authenticate user login.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### GET `/api/products`

Get all products with optional filtering.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)
- `category`: Filter by category
- `search`: Search in name/description
- `producerId`: Filter by producer

#### POST `/api/products`

Create a new product (Producer only).

**Headers:**

```
Authorization: Bearer <user-id>
```

**Request Body:**

```json
{
  "name": "Fresh Tomatoes",
  "description": "Organic tomatoes from local farm",
  "price": 25.99,
  "quantity": 100,
  "category": "Vegetables",
  "imageUrl": "https://example.com/image.jpg"
}
```

#### GET `/api/products/[id]`

Get product details by ID.

#### PUT `/api/products/[id]`

Update product (Producer only).

#### DELETE `/api/products/[id]`

Delete product (Producer only).

### Order Endpoints

#### GET `/api/orders`

Get user orders (role-based).

#### POST `/api/orders`

Create new order (Consumer only).

**Request Body:**

```json
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 5
    }
  ]
}
```

#### GET `/api/orders/[id]`

Get order details.

#### PUT `/api/orders/[id]`

Update order status (Producer only).

### Dashboard Endpoints

#### GET `/api/dashboard/stats`

Get dashboard statistics (role-based).

### Producer Endpoints

#### GET `/api/producer/profile`

Get producer profile.

#### PUT `/api/producer/profile`

Update producer profile.

## 🗄️ Database Schema

### Core Models

- **User**: Authentication and role management
- **ProducerProfile**: Extended producer information
- **Product**: Agricultural product listings
- **Order**: Purchase orders
- **OrderItem**: Individual order line items

### Relationships

- User → ProducerProfile (1:1)
- ProducerProfile → Product (1:many)
- User → Order (1:many)
- Order → OrderItem (1:many)
- Product → OrderItem (1:many)

## 🔐 Authentication

Currently uses simple token-based authentication. For production:

1. Implement NextAuth.js with JWT (see Phase 3 section below)
2. Add password hashing with bcrypt
3. Add rate limiting and security headers
4. Implement refresh tokens

## 🚀 Deployment

### Vercel Deployment

1. Connect GitHub repository
2. Add environment variables
3. Set up PostgreSQL database (e.g., Neon, Supabase)
4. Deploy automatically on push

### Environment Variables for Production

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="secure-random-string"
```

## 📱 Mobile Responsiveness

- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly interactions
- Optimized animations for mobile

## 🎨 Design Features

- **Roboto Mono** typography with increased font weight
- **Framer Motion** animations throughout
- **Stunning hero transition**: 3-second display → 2.5s cinematic fade-out
- **Floating leaf animation** with gentle movement
- **Gradient backgrounds** and modern UI components

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma studio    # Open Prisma Studio
npx prisma db push   # Push schema changes
npx prisma generate  # Generate Prisma client

# Code Quality
npm run lint         # Run ESLint
```

## 📈 Future Enhancements

- [ ] NextAuth.js integration
- [ ] Payment integration (Paystack)
- [ ] Image upload (Cloudinary)
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Review and rating system
- [ ] Chat/messaging system
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
