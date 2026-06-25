# MapYourRoad

MapYourRoad is a full-stack web application for creating, exploring, and tracking visual learning paths. Instead of flat checklists, subjects are represented as interactive node-and-edge graphs on an infinite canvas — each topic is a node, each dependency an edge. Users can build their own roadmaps, enrich every topic with notes and resources, track their progress, and browse a library of prebuilt paths.

**Live demo:** https://map-your-road.vercel.app
**Repository:** https://github.com/sreyashp07/MapYourRoad

---

## Overview

Learning a new subject usually means following a linear list, which hides how topics actually relate to one another. MapYourRoad turns any subject — frontend, machine learning, system design, DSA, research, and more — into a living map you can see, follow, and complete.

The application has two distinct visual environments: a light, soft-brutalist marketing and dashboard experience in an olive-and-cream palette, and a focused dark "arcade" canvas where the actual roadmap building takes place. Motion is handled throughout with GSAP for a smooth, cinematic feel.

---

## Features

- **Interactive canvas builder** — a drag-and-drop editor powered by React Flow, with custom nodes, animated edges, panning, zooming, and a minimap.
- **Plug-and-play topic system** — start from a template, add suggested topics from a floating panel (drag or click), create custom topics, and auto-connect them into a path.
- **Per-node detail** — click any node to edit its title inline or open a side panel to add a description, status, notes, and resources.
- **Progress tracking** — mark topics as to-do, in-progress, or done; a live progress bar and completion animations reflect your advancement.
- **Persistence** — roadmaps are saved to MongoDB and tied to the authenticated user, with a live save-state indicator.
- **Authentication** — email and password sign-up and sign-in with hashed credentials and JWT sessions.
- **Dashboard** — a soothing home base showing your roadmaps, count-up statistics, and quick-start templates.
- **Explore** — a catalog of learning domains; clicking a field expands to reveal all the topics inside it.
- **Community** — a set of curated, prebuilt roadmaps with canvas previews, gated behind sign-in for full access.
- **Cinematic UI** — branded preloader, animated network-web backgrounds, scroll-triggered reveals, and smooth page transitions.
- **Responsive** — adapts across mobile, tablet, and desktop.

---

## Tech Stack

### Frontend
- Next.js 16 (App Router, Server Components, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- GSAP with @gsap/react
- React Flow v12 (@xyflow/react)
- Redux Toolkit
- Clash Display and Satoshi (self-hosted variable fonts, Fontshare)

### Backend
- Next.js Server Actions and Route Handlers
- Auth.js v5 (NextAuth, Credentials provider)
- bcryptjs (password hashing)
- Zod (validation)

### Database
- MongoDB Atlas
- Mongoose (ODM)

### Tooling and Deployment
- ESLint and Prettier
- Vercel (hosting and CI/CD)
- Git and GitHub

---

## System Architecture
                        Browser (Client)
    Landing / Dashboard / Explore / Community / Builder
    React 19, Tailwind v4, GSAP, React Flow, Redux Toolkit
                              |
                              | HTTP / Server Actions
                              v
                  Next.js 16 (App Router) on Vercel
    +-----------------------------------------------------+
    |  Server Components        Route Handlers            |
    |  - page rendering         - /api/auth/[...nextauth] |
    |  - data fetching          - /api/health             |
    |                                                     |
    |  Server Actions           Edge Proxy (proxy.ts)     |
    |  - roadmap CRUD           - JWT verification        |
    |  - auth (login/register)  - route protection        |
    +-----------------------------------------------------+
          |                                   |
          | Mongoose                          | Auth.js v5
          v                                   v
    +-------------------+            +----------------------+
    |  MongoDB Atlas    |            |  JWT session token   |
    |  - users          |            |  (httpOnly cookie)   |
    |  - roadmaps       |            +----------------------+
    |    (nodes + edges |
    |     embedded)     |
    +-------------------+

### Key Design Decisions

- **Embedded graph model.** A roadmap's nodes and edges are stored as embedded subdocuments inside the `Roadmap` document rather than separate collections. Because the canvas always loads an entire roadmap at once, a single read returns the full graph in a shape that maps directly onto React Flow.
- **Split auth configuration.** Authentication uses an edge-safe `auth.config.ts` (no database access) for the proxy/middleware layer and a full `auth.ts` (Node runtime, Mongoose plus bcrypt) for the Credentials provider. The proxy only verifies the JWT, so it never needs the database driver at the edge.
- **Deferred database connection.** The MongoDB connection is created lazily and cached across serverless invocations, and the connection string is read at request time rather than module load, so builds never fail on a missing environment variable.
- **Two theme environments.** Marketing and dashboard surfaces use a light soft-brutalist olive/cream system; the builder uses a dark arcade palette. Both share a single set of self-hosted fonts and design tokens.

---

## Data Model

| Collection | Purpose |
| --- | --- |
| `users` | Account records: name, email, bcrypt-hashed password. |
| `roadmaps` | A roadmap owned by a user. Contains title, slug, owner reference, visibility, and embedded `nodes` and `edges` arrays that mirror the React Flow graph shape. |

Each embedded node stores its id, position, and a `data` object (label, description, status, notes). Each embedded edge stores its id, source, target, and type.

---

## Project Structure
src/

app/                     App Router routes

dashboard/             authenticated user dashboard

builder/               roadmap canvas editor

explore/  community/   discovery pages

about/                 about page

login/  register/      auth pages

api/                   route handlers (auth, health)

components/              shared UI (brand, landing, dashboard, auth, community)

features/

auth/                  auth server actions

canvas/                React Flow canvas, nodes, edges, panels

roadmaps/              roadmap CRUD server actions

community/             prebuilt roadmap data

lib/                     db connection, fonts, utilities

models/                  Mongoose schemas

store/                   Redux Toolkit store and slices

types/                   shared TypeScript types

auth.ts                  full Auth.js config (Node runtime)

auth.config.ts           edge-safe Auth.js config

proxy.ts                 route-protection proxy (Next.js 16 middleware)

---

## Local Setup

### Prerequisites

- Node.js 18.18 or later
- A MongoDB Atlas cluster (free tier is sufficient)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/sreyashp07/MapYourRoad.git
cd MapYourRoad
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
MONGODB_URI="your-mongodb-atlas-connection-string"
AUTH_SECRET="your-generated-secret"
AUTH_URL="http://localhost:3000"
```

- `MONGODB_URI` — your Atlas connection string, including the database name (for example, `.../mapyourroad?...`). If your network blocks SRV DNS lookups, use the standard (non-SRV) `mongodb://` connection string with explicit shard hosts.
- `AUTH_SECRET` — generate one with `openssl rand -base64 32`.

### 4. Allow your IP in Atlas

In the MongoDB Atlas dashboard, go to Network Access and add your current IP address (or `0.0.0.0/0` for development).

### 5. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`. You can verify the database connection at `http://localhost:3000/api/health`, which should return `{ "ok": true, "db": "connected", "state": 1 }`.

### 6. Build for production

```bash
npm run build
npm start
```

---

## Deployment

The application is deployed on Vercel.

1. Import the GitHub repository into Vercel; the Next.js preset is detected automatically.
2. Add the environment variables `MONGODB_URI` and `AUTH_SECRET` in the project settings, scoped to the Production environment. `AUTH_URL` is optional on Vercel, since the host is detected automatically.
3. In MongoDB Atlas, ensure Network Access allows connections from anywhere (`0.0.0.0/0`) so the deployed serverless functions can reach the database.
4. Deploy. Every subsequent push to the `main` branch triggers an automatic redeployment.

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create an optimized production build. |
| `npm start` | Run the production build locally. |
| `npm run lint` | Run ESLint. |

---

## License

This project is available under the MIT License.
