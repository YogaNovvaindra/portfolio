# Portfolio & Blog Website

This repository contains the source code for my personal portfolio and technical blog.  
It showcases my projects and skills as a DevOps Engineer, with a fully integrated custom frontend pulling posts from a Headless Ghost CMS.

## 🚀 Tech Stack

- **Framework**: Vue.js 3.5.25
- **Routing**: Vue Router 4.6.3
- **Styling**: Tailwind CSS 3.4.18
- **HTTP Client**: Axios 1.13.2
- **CMS**: Ghost Content API (Headless)
- **Build Tool**: Vue CLI 5.0.9

## 🔐 Environment Variables

To run the application locally or build it via Docker, you must provide your Ghost API credentials.
Create a `.env` file in the root of the project:

```env
# .env
VUE_APP_GHOST_URL=https://ygnv.my.id
VUE_APP_GHOST_KEY=your_ghost_content_api_key_here
```

## 📋 Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

## 🛠️ Installation

```bash
npm install
```

## 🏃 Development

### Start development server
```bash
npm run serve
```
The app will be available at `http://localhost:8080`

### Build for production
```bash
npm run build
```
The production-ready files will be in the `dist/` directory.

### Lint and fix files
```bash
npm run lint
```

## 🐳 Docker Deployment

This project includes Docker support for containerized deployment, utilizing a multi-stage Nginx build.

### Build Docker image
Because the Vue app is compiled into static files, environment variables must be passed as `build-args` during the build step:

```bash
docker build \
  --build-arg VUE_APP_GHOST_URL=https://ygnv.my.id \
  --build-arg VUE_APP_GHOST_KEY=your_ghost_content_api_key_here \
  -t portfolio:latest .
```

### Run container
```bash
docker run -p 80:80 portfolio:latest
```

## 📁 Project Structure

```text
portfolio/
├── public/          # Static assets
├── src/
│   ├── assets/      # CSS, tokens, and data.json
│   ├── components/  # Reusable Vue components
│   ├── router/      # Vue Router configuration
│   ├── services/    # API integrations (Ghost CMS)
│   ├── views/       # Page components (Home, Portfolio, Blog)
│   └── main.js      # Application entry point
├── .github/         # GitHub Actions workflows for CI/CD
├── Dockerfile       # Multi-stage Docker build
└── default.conf     # Nginx routing configuration
```

## 🔄 CI/CD

The project uses GitHub Actions for automated Docker builds and pushes to the GitHub Container Registry (`ghcr.io`) upon pushing to the `main` branch. 
*Note: Make sure `VUE_APP_GHOST_URL` and `VUE_APP_GHOST_KEY` are added to your GitHub Actions Secrets to ensure the automated build has access to the CMS.*

## 📄 License

This project is private.
