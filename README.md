# MapYourRoad

> Turn any subject into a living map. MapYourRoad replaces flat learning checklists with interactive node-and-edge graphs on an infinite canvas, where every topic is a node and every dependency an edge.

![Status](https://img.shields.io/badge/STATUS-DEPLOYED-2ea44f?style=for-the-badge)
![Vercel](https://img.shields.io/badge/VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GITHUB-181717?style=for-the-badge&logo=github&logoColor=white)

![Next.js](https://img.shields.io/badge/NEXT.JS_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/REACT_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TAILWIND_CSS_V4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/SHADCN%2FUI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![React Flow](https://img.shields.io/badge/REACT_FLOW-FF0072?style=for-the-badge)
![Redux Toolkit](https://img.shields.io/badge/REDUX_TOOLKIT-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Auth.js](https://img.shields.io/badge/AUTH.JS-1A1A2E?style=for-the-badge)
![Zod](https://img.shields.io/badge/ZOD-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

![MongoDB](https://img.shields.io/badge/MONGODB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/MONGOOSE-880000?style=for-the-badge&logo=mongoose&logoColor=white)

**Live:** https://map-your-road.vercel.app &nbsp;&middot;&nbsp; **Repository:** https://github.com/sreyashp07/MapYourRoad

---

## Why MapYourRoad

Most learning resources hand you a linear list, which hides how topics actually relate to one another. You end up memorizing an order instead of understanding a structure. MapYourRoad makes the shape of a subject visible: lay topics out on an infinite canvas, connect them into real dependencies, enrich each one with notes and resources, and watch your progress light up as you go.

It works for anything that can be learned in steps: frontend, machine learning, system design, data structures, security, or an entirely personal research direction.

The experience deliberately runs in two moods. The marketing and dashboard surfaces are light and calm, built in a soft-brutalist olive-and-cream palette. The builder itself is a focused, dark "arcade" canvas. Motion is woven through both with GSAP, from the branded preloader to scroll-triggered reveals and animated graph entrances, so the whole product feels alive rather than static.

---

## Features

- **Interactive canvas builder.** A drag-and-drop editor powered by React Flow, with custom-designed nodes, animated flowing edges, panning, zooming, controls, and a minimap.
- **Plug-and-play topics.** Begin from a template, pull suggested topics from a floating panel (drag or click), add your own custom topics, and auto-connect them into a coherent path.
- **Rich nodes.** Rename a node inline on the canvas, or open a side panel to set its description, status, and free-form notes and resources.
- **Progress tracking.** Move topics through to-do, in-progress, and done. A live progress bar and a satisfying completion animation reflect every step forward.
- **Persistence.** Roadmaps are saved to MongoDB and tied to the signed-in user, with a live save-state indicator in the builder header.
- **Authentication.** Email-and-password sign-up and sign-in backed by hashed credentials and JWT sessions.
- **Soothing dashboard.** A calm home base with a time-based greeting, count-up statistics, quick-start templates, and progress rings on every roadmap.
- **Explore.** A catalog of learning domains; click any field to expand it in place and reveal the full list of topics inside.
- **Community.** A curated set of prebuilt roadmaps with canvas previews, with full access gated behind sign-in.
- **Cinematic interface.** Branded preloader, animated network-web backgrounds, scroll-triggered section reveals, and smooth page transitions.
- **Responsive.** Adapts cleanly across mobile, tablet, and desktop.

---

## Tech Stack

| Layer                | Technologies                                                                    |
| -------------------- | ------------------------------------------------------------------------------- |
| Framework            | Next.js 16 (App Router, Server Components, Server Actions, Turbopack), React 19 |
| Language             | TypeScript                                                                      |
| Styling              | Tailwind CSS v4, shadcn/ui, self-hosted Clash Display and Satoshi fonts         |
| Canvas and motion    | React Flow v12 (@xyflow/react), GSAP with @gsap/react                           |
| State and validation | Redux Toolkit, Zod                                                              |
| Authentication       | Auth.js v5 (Credentials provider), bcryptjs, JWT sessions                       |
| Database             | MongoDB Atlas, Mongoose                                                         |
| Tooling              | ESLint, Prettier                                                                |
| Deployment           | Vercel, GitHub (automatic CI/CD on push)                                        |

---

## System Architecture

```
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
```

### Key Design Decisions

- **Embedded graph model.** A roadmap's nodes and edges are stored as embedded subdocuments inside the `Roadmap` document rather than as separate collections. Because the canvas always loads an entire roadmap at once, a single read returns the complete graph in a shape that maps directly onto React Flow.
- **Split authentication config.** Auth uses an edge-safe `auth.config.ts` (no database access) for the proxy layer and a full `auth.ts` (Node runtime, Mongoose plus bcrypt) for the Credentials provider. The proxy only verifies the JWT, so the database driver never has to run at the edge.
- **Deferred database connection.** The MongoDB connection is created lazily, cached across serverless invocations, and reads its connection string at request time rather than at module load, so builds never fail on a missing environment variable.
- **Two theme environments.** Marketing and dashboard surfaces use a light soft-brutalist olive/cream system; the builder uses a dark arcade palette. Both share one set of self-hosted fonts and design tokens.

---

## Data Model

| Collection | Purpose                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `users`    | Account records: name, email, and a bcrypt-hashed password.                                                                                                |
| `roadmaps` | A roadmap owned by a user. Holds title, slug, owner reference, visibility, and embedded `nodes` and `edges` arrays that mirror the React Flow graph shape. |

Each embedded node stores its id, position, and a `data` object (label, description, status, notes). Each embedded edge stores its id, source, target, and type.

---

## Project Structure

```
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
```

---

## Local Setup

### Prerequisites

- Node.js 18.18 or later
- A MongoDB Atlas cluster (the free tier is sufficient)
- Git

### 1. Clone and install

```bash
git clone https://github.com/sreyashp07/MapYourRoad.git
cd MapYourRoad
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
MONGODB_URI="your-mongodb-atlas-connection-string"
AUTH_SECRET="your-generated-secret"
AUTH_URL="http://localhost:3000"
```

- `MONGODB_URI` must include the database name, for example `.../mapyourroad?...`. If your network blocks SRV DNS lookups, use the standard non-SRV `mongodb://` string with explicit shard hosts.
- Generate `AUTH_SECRET` with `openssl rand -base64 32`.

### 3. Allow your IP in Atlas

In the MongoDB Atlas dashboard, open Network Access and add your current IP address, or `0.0.0.0/0` for development.

### 4. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`. The database connection can be verified at `http://localhost:3000/api/health`, which returns `{ "ok": true, "db": "connected", "state": 1 }` when everything is wired correctly.

### 5. Production build

```bash
npm run build
npm start
```

---

## Deployment

The application is deployed on Vercel.

1. Import the GitHub repository into Vercel; the Next.js preset is detected automatically.
2. Add `MONGODB_URI` and `AUTH_SECRET` as environment variables in the project settings, scoped to the Production environment. `AUTH_URL` is optional on Vercel because the host is detected automatically.
3. In MongoDB Atlas, ensure Network Access allows connections from anywhere (`0.0.0.0/0`) so the deployed serverless functions can reach the database.
4. Deploy. Every subsequent push to the `main` branch triggers an automatic redeployment.

---

## Available Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the development server.         |
| `npm run build` | Create an optimized production build. |
| `npm start`     | Run the production build locally.     |
| `npm run lint`  | Run ESLint.                           |

---

## License

Released under the MIT License.
