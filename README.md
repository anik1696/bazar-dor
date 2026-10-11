# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে।

---

## 🚀 Live Demo

> _Deploy link — add after submission_

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Framework, SSR, routing |
| **React 19** | UI library |
| **HeroUI v2** (`@heroui/react`) | Component library (Navbar, Card, Button, Table, Input…) |
| **Tailwind CSS v3** | Utility-first styling |
| **BetterAuth** | Auth — email/password + Google + GitHub |
| **react-hot-toast** | Toast notifications |
| **JavaScript (ES Modules)** | No TypeScript |

---

## ✨ Key Features

1. **🔄 Live Price Ticker** — Infinite auto-scrolling marquee below the navbar showing emoji + name + price/unit + ▲/▼ % change. Pauses on hover.

2. **📊 Price Mover Sections** — Home page highlights top 6 daily risers (▲ green) and top 6 fallers (▼ red) for instant awareness.

3. **🔐 Auth-Protected Product Details** — Full market-wise price table (min/max/avg per bazar + division) is gated behind login — non-logged-in users are redirected with a toast message.

4. **⚖️ Numeric Sort by Price (C1)** — Category pages use a **HeroUI Select** dropdown with three options: ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম — sorted numerically, not as strings.

5. **📱 Fully Responsive** — Mobile-first 2→3→4 column grid, collapsible category nav, stacked hero on small screens.

6. **🏷️ Bengali Numerals** — All prices and counts display in Bengali digits (১, ২, ৩…) using a custom `toBn()` utility.

7. **👤 Profile + Update (C3)** — Logged-in users can view their profile at `/profile` and update their display name at `/profile/update` via BetterAuth `updateUser`.

8. **🗂️ Multi-endpoint API Fallback** — Tries 3 different API base URLs automatically, so the app keeps working even if one is down.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.jsx      # Sign In (email + social)
│   │   ├── sign-up/page.jsx      # Sign Up
│   │   ├── profile/page.jsx      # My Profile (protected)
│   │   └── profile/update/page.jsx  # Update name (C3)
│   ├── api/
│   │   ├── auth/[...all]/        # BetterAuth handler
│   │   ├── categories/[slug]/    # Category API proxy
│   │   └── products/ + [slug]/   # Products API proxy
│   ├── category/[slug]/page.jsx  # Category listing + sort
│   ├── product/[slug]/page.jsx   # Product detail (protected)
│   ├── globals.css
│   ├── layout.jsx                # Root layout (HeroUIProvider + AuthProvider)
│   ├── not-found.jsx             # 404 page
│   └── page.jsx                  # Home page
├── components/
│   ├── Navbar.jsx                # Sticky header + category nav + user menu
│   ├── PriceTicker.jsx           # Scrolling price marquee
│   ├── ProductCard.jsx           # Card + skeleton
│   └── Footer.jsx
├── context/AuthContext.jsx       # Auth state + BetterAuth integration
└── lib/
    ├── api.js                    # Data fetching
    ├── auth.js                   # BetterAuth server config
    ├── auth-client.js            # BetterAuth client
    └── utils.js                  # Bengali numerals, date, units, sort
```

---

## 🔌 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /products` | All 33 products |
| `GET /products?category=chal` | Filtered by category |
| `GET /products/:id` | Single product with market data |
| `GET /categories` | All 8 categories |
| `GET /categories/:slug` | Single category |

**Base URLs (tried in order):**
1. `https://openapi.programming-hero.com/api/bazardor`
2. `https://api.api-store.workers.dev/api/bazardor`
3. `https://api.abcz.workers.dev/api/bazardor`

---

## 🏃 Getting Started

```bash
git clone <your-repo-url>
cd bazar-dor
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Optional — Social Login (`.env.local`)
```env
BETTER_AUTH_SECRET=your-random-secret-32-chars
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

---

## 📬 Submission

- **Live Link:** _TBD_
- **GitHub Repository:** _TBD_
