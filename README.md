# shop.com — Full Stack E-Commerce

A full-stack e-commerce web application built with React, Node.js, PostgreSQL, Prisma, and Stripe.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| Payments | Razorpay |
| Hosting (DB) | Render |

## Features

- Intro animation on first load
- Product browsing with category filtering and search
- User registration and login with JWT authentication
- Persistent cart (synced to database for logged-in users)
- Stripe payment integration
- Order history
- Admin dashboard (stats, order management, product CRUD)
- Fully responsive design

## Project Structure

```
├── src/                        # Frontend (React)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── Checkout.jsx
│   │   ├── Payment.jsx
│   │   ├── ProductDetail.jsx
│   │   └── Admin.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── PromoBanner.jsx
│   │   └── IntroAnimation.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   └── api/
│       ├── axiosInstance.js
│       ├── auth.js
│       └── products.js
│
└── server/                     # Backend (Node.js + Express)
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.js
    └── src/
        ├── index.js
        ├── lib/
        │   └── prisma.js
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── product.controller.js
        │   ├── cart.controller.js
        │   ├── order.controller.js
        │   ├── admin.controller.js
        │   └── payment.controller.js
        ├── routes/
        │   ├── auth.routes.js
        │   ├── product.routes.js
        │   ├── cart.routes.js
        │   ├── order.routes.js
        │   ├── admin.routes.js
        │   └── payment.routes.js
        └── middleware/
            └── auth.middleware.js
```

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL database
- Razorpay account

### Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=sk_test_...
```

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

Create `.env` in root:
```
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Prisma Studio (visual database browser)
```bash
cd server
npx prisma studio
```
Opens at `http://localhost:5555`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login, returns JWT token |

### Products (public)
| Method | Endpoint | Description |
|---|---|---|
| GET | /products | All products, optional ?category= |
| GET | /products/search | Search by ?q= |
| GET | /products/:id | Single product |

### Cart (requires auth)
| Method | Endpoint | Description |
|---|---|---|
| GET | /cart | Get user's cart |
| POST | /cart | Add item |
| PUT | /cart/:itemId | Update quantity |
| DELETE | /cart/:itemId | Remove item |

### Orders (requires auth)
| Method | Endpoint | Description |
|---|---|---|
| POST | /orders | Create order from cart |
| GET | /orders | Order history |
| GET | /orders/:id | Single order |

### Payment (requires auth)
| Method | Endpoint | Description |
|---|---|---|
| POST | /payment/create-intent | Create Razorpay PaymentIntent |
| POST | /payment/confirm | Confirm payment, create order |

### Admin (requires auth + ADMIN role)
| Method | Endpoint | Description |
|---|---|---|
| GET | /admin/stats | Dashboard stats |
| GET | /admin/orders | All orders |
| PUT | /admin/orders/:id | Update order status |
| GET | /admin/users | All users |
| POST | /admin/products | Create product |
| PUT | /admin/products/:id | Update product |
| DELETE | /admin/products/:id | Delete product |

## Test Payment

Use Razorpay test card:
```
Card number: 4111 1111 1111 1111
Expiry: Any future date
CVC: Any 3 digits
```

## Making a User Admin

Open Prisma Studio → User table → find your user → change role to `ADMIN` → save.
