# 🛒 বাজার দর (BazarDor)

A full-stack daily commodity price tracking web application for Bangladesh. Users can view real-time market prices, track daily price movers, view market-by-market comparisons across divisions, sort products by numeric value, and manage accounts with secure authentication.

---

## Overview

BazarDor was built to provide transparency in daily commodity pricing across major markets in Bangladesh. The application pulls product data across multiple commodity categories (rice, lentils, oil, vegetables, fish, meat, dairy, and spices), displays daily price fluctuations with visual change indicators, and offers authenticated users detailed market breakdowns with minimum, maximum, and average rates.

---

## Tech Stack

**Frontend**

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![HeroUI](https://img.shields.io/badge/HeroUI-000000?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Backend & Authentication**

![BetterAuth](https://img.shields.io/badge/Better_Auth-05893E?style=for-the-badge&logo=auth0&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## Features

- **Live Price Ticker** — Continuous scrolling marquee strip displaying daily commodity prices and real-time percentage changes with pause-on-hover interaction.
- **Top Price Movers** — Automated highlights for the top 6 daily price risers (▲ green) and top 6 fallers (▼ red) directly on the home page.
- **Protected Product Details** — Full breakdown with market-wise rates, divisional comparisons, and summary statistics (minimum, maximum, and average price) gated behind user authentication.
- **Numeric Price Sorting (C1)** — Interactive sort control with options for default, price low-to-high, and price high-to-low, accurately sorting Bengali numeral values numerically.
- **Responsive Bengali Interface** — Styled with Google's Hind Siliguri typography, featuring localized date formatting and Bengali numeral conversions.
- **Authentication & OAuth** — Complete credential login and registration paired with Google and GitHub OAuth providers via Better Auth and MongoDB Atlas.
- **Profile Information Management (C3)** — Dedicated profile route with editable name updates via Better Auth's `updateUser` API.
- **Multi-Endpoint API Resilience** — Automatic fallback system checking three independent API sources to guarantee high uptime.

---

## Dependencies

| Package | Purpose |
|---|---|
| `next` | React framework with App Router & SSR |
| `react` / `react-dom` | Core user interface library |
| `@heroui/react` | Accessible modern UI component library |
| `better-auth` | Authentication framework (email/password, OAuth) |
| `mongodb` | Native MongoDB client driver for Atlas |
| `tailwindcss` | Utility-first CSS styling |
| `framer-motion` | Animation engine for HeroUI components |
| `react-hot-toast` | Lightweight notifications for auth and redirects |
| `clsx` / `tailwind-merge` | Dynamic className composition utilities |

---

## Run Locally

**Requirements:** Node.js 18+ and a MongoDB connection string.

```bash
# Clone the repository
git clone https://github.com/anik1696/bazar-dor.git
cd bazar-dor

# Install dependencies
npm install

# Set up environment variables (.env.local)
# Create a .env.local file in the root directory:
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_atlas_connection_string
BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_GOOGLE_SECRET=your_google_client_secret
BETTER_AUTH_GITHUB_CLIENT_ID=your_github_client_id
BETTER_AUTH_GITHUB_SECRET=your_github_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Repository

[github.com/anik1696/bazar-dor](https://github.com/anik1696/bazar-dor)
