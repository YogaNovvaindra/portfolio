FROM node:lts AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Ghost settings for the build environment
ARG NUXT_PUBLIC_GHOST_URL
ARG NUXT_GHOST_KEY
ENV NUXT_PUBLIC_GHOST_URL=${NUXT_PUBLIC_GHOST_URL}
ENV NUXT_GHOST_KEY=${NUXT_GHOST_KEY}
ENV GHOST_URL=${NUXT_PUBLIC_GHOST_URL}
ENV GHOST_KEY=${NUXT_GHOST_KEY}

# Build the Nuxt 3 application
RUN npm run build

# Production image
FROM node:lts-alpine AS production
RUN apk add --no-cache tzdata
ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

WORKDIR /app

# Copy the server output from builder
COPY --from=builder /app/.output ./

# Set runtime environment variables
ARG NUXT_PUBLIC_GHOST_URL
ARG NUXT_GHOST_KEY
ENV NUXT_PUBLIC_GHOST_URL=${NUXT_PUBLIC_GHOST_URL}
ENV NUXT_GHOST_KEY=${NUXT_GHOST_KEY}
ENV GHOST_URL=${NUXT_PUBLIC_GHOST_URL}
ENV GHOST_KEY=${NUXT_GHOST_KEY}
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server/index.mjs"]
