# Portfolio Website

This repository contains the source code for my personal portfolio website.  
It showcases my projects and skills as a DevOps Engineer and tech enthusiast.

## 🚀 Tech Stack

- **Framework**: Vue.js 3.5.25
- **Routing**: Vue Router 4.6.3
- **Styling**: Tailwind CSS 3.4.18
- **HTTP Client**: Axios 1.13.2
- **Build Tool**: Vue CLI 5.0.9
- **Linting**: ESLint 8.57.1

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

This project includes Docker support for containerized deployment.

### Build Docker image
```bash
docker build -t portfolio:latest .
```

### Run container
```bash
docker run -p 80:80 portfolio:latest
```

The application uses a multi-stage build with Nginx for serving the static files.

## 📁 Project Structure

```
portfolio/
├── public/          # Static assets
├── src/
│   ├── assets/      # CSS and images
│   ├── components/  # Vue components
│   ├── router/      # Vue Router configuration
│   ├── views/       # Page components
│   └── main.js      # Application entry point
├── .github/         # GitHub Actions workflows
├── Dockerfile       # Docker configuration
└── nginx.conf       # Nginx configuration
```

## 🔄 CI/CD

The project uses GitHub Actions for automated Docker builds and pushes to GitHub Container Registry on pushes to the `main` branch.

## 📝 Customize Configuration

See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).

## 📄 License

This project is private.
