# Apex Solution — AI-Powered Software & Tech

> Ethiopia's AI-first technology company delivering intelligent software, hotel technology, networking infrastructure, and IT consulting services.

**Live Site:** [apex-solution.vercel.app](https://apex-solution.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 · TypeScript · Tailwind CSS v4 |
| UI | shadcn/ui · Lucide React |
| Backend | Django 5.2 · Django REST Framework · JWT |
| Database | MySQL (Aiven Cloud) |
| Images | Cloudinary · Unsplash |
| AI Chat | Anthropic Claude (Haiku) |
| Fonts | Plus Jakarta Sans · Inter |
| Deployment | Vercel (frontend + backend) |

---

## Project Structure

```
apex/
├── app/                    # Next.js App Router
│   ├── (User)/             # Public-facing pages
│   │   ├── page.tsx        # Home
│   │   ├── About/
│   │   ├── Services/
│   │   ├── Portfolio/
│   │   ├── Blog/
│   │   ├── Partners/
│   │   └── Contact/
│   ├── (Admin)/            # Protected admin panel
│   │   ├── Builder/        # Login page
│   │   └── BuilderDashboard/
│   ├── api/chat/           # Anthropic AI chat endpoint
│   └── globals.css         # Design system tokens + animations
├── Components/             # All React components
│   ├── ui/                 # shadcn base components
│   ├── ApexChat.tsx        # Floating AI assistant
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── BackEnd/                # Django REST API
│   ├── accounts/           # Auth (JWT login, change password)
│   ├── hero/               # Hero footer stats
│   ├── services/
│   ├── portfolio/
│   ├── blogs/
│   ├── teams/
│   ├── partners/
│   ├── contacts/
│   └── testimonials/
├── constants/index.ts      # Static default data + fallbacks
├── lib/actions.ts          # All API fetch functions
└── lib/validation.ts       # Zod schemas
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.12+
- Git

### Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Fill in your values (see Environment Variables below)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
cd BackEnd

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend runs at [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Environment Variables

### Frontend — `.env.local`

```env
# Cloudinary (image uploads in admin panel)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your_preset_name

# Backend API URL (defaults to production if not set)
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

# Anthropic API key (enables Apex AI chat assistant)
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Backend — `BackEnd/.env`

```env
DEBUG=True
SECRET_KEY=your_secret_key
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=3306

CORS_ALLOWED_ORIGINS=http://localhost:3000
```

---

## Features

### Public Website
- **Home** — AI-first hero with typewriter animation, animated stats, services preview, portfolio preview, AI showcase section, testimonials, partners marquee
- **About** — Company story, mission/vision/values, team with portfolio links, timeline, testimonials
- **Services** — 10 AI-augmented services with premium icon cards
- **Portfolio** — 21+ projects with live search + category filter
- **Blog** — Featured post layout, Ethiopia 🇪🇹 / Global 🌍 category filter, Unsplash images
- **Partners** — Dual-row infinite CSS marquee
- **Contact** — Two-column form with service dropdown, animated success state

### Admin Panel (`/Builder`)
- JWT authentication with auto token refresh
- Manage: Services, Portfolio, Blogs, Team, Partners, Testimonials, Contacts, Hero Stats
- Cloudinary image uploads
- Password change

### Apex AI Chat
- Floating assistant (bottom-right, amber icon with pulse ring)
- Powered by Anthropic Claude Haiku
- Full conversation history
- Quick prompt suggestions
- Graceful fallback when API key is not configured

---

## Design System

- **Dark-only** — `#0A0A0A` base, no light mode
- **Accent** — `#2563EB` electric blue, `#06B6D4` cyan
- **Typography** — Plus Jakarta Sans (headings), Inter (body)
- **Animations** — fade-up, float, pulse-glow, marquee, shimmer buttons
- **Glass morphism** — `backdrop-filter: blur(20px)` on navbar, chat panel
- **Geometric grid** — CSS background on hero and CTA sections

---

## Team

| Name | Role |
|------|------|
| Atlabachew Tadese | CoFounder & CEO |
| Abdurehman Ali | CoFounder & CTO |
| Tewodros Million | Technical Project Manager & AI Solutions Lead |

---

## License

Private — All rights reserved © 2024 Apex Solution
