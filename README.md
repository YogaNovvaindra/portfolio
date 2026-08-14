# Portfolio & Blog Website

This repository contains the source code for my personal portfolio and technical blog.
It showcases my projects and skills as a DevOps Engineer, with a fully integrated custom frontend pulling posts from a Headless Ghost CMS.

## 🚀 Tech Stack

- **Framework**: Nuxt 4.4.7
- **Rendering**: Vue 3.5.25 + Nitro server
- **Styling**: Tailwind CSS 3.4.18
- **CMS**: Ghost Content API (Headless)
- **Build Tool**: Nuxt CLI / Vite

## 🔐 Environment Variables

Create a `.env` file in the project root with your Ghost API configuration:

```env
# .env
NUXT_PUBLIC_GHOST_URL=http://localhost:8080
NUXT_GHOST_KEY=your_ghost_content_api_key_here
```

Notes:
- `NUXT_PUBLIC_GHOST_URL` is used for the public runtime config and browser-facing API base URL.
- `NUXT_GHOST_KEY` is the Ghost Content API key used by the server-side fetches.

## 📋 Prerequisites

- Node.js (LTS version recommended)
- npm

## 🛠️ Installation

```bash
npm install
```

## 🏃 Development

### Start development server
```bash
npm run dev
```
The app will be available at `http://localhost:3000` by default in Nuxt.

### Build for production
```bash
npm run build
```
The production-ready server bundle is generated in the `.output/` directory.

## 🐳 Docker Deployment

This project includes Docker support for containerized deployment with a Nuxt production build.

### Build Docker image
Environment variables are passed as build args and exposed to the Nuxt runtime configuration:

```bash
docker build \
  --build-arg NUXT_PUBLIC_GHOST_URL=https://ygnv.my.id \
  --build-arg NUXT_GHOST_KEY=your_ghost_content_api_key_here \
  -t portfolio:latest .
```

### Run container
```bash
docker run -p 3000:3000 portfolio:latest
```

## 📁 Project Structure

```text
portfolio/
├── app.vue
├── assets/          # Global styles and static assets
├── components/      # Reusable Vue components
├── pages/           # Nuxt page routes
├── plugins/         # Client-side plugins
├── public/          # Static public directory
├── server/          # Nitro server routes, middleware, and utilities
├── services/        # App-level service logic
├── src/             # Legacy or compatibility code
├── Dockerfile       # Multi-stage Nuxt Docker build
├── nuxt.config.ts   # Nuxt runtime config and route proxies
├── package.json     # Scripts and app dependencies
├── .env             # Local runtime environment variables
└── README.md        # Project documentation
```

## 🔄 CI/CD

The project uses GitHub Actions for automated Docker builds and publishing. 
*Note: Make sure `NUXT_PUBLIC_GHOST_URL` and `NUXT_GHOST_KEY` are added to your GitHub Actions secrets so the build has access to the CMS.*

## 📄 License

This project is private.
