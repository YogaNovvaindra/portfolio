FROM node:lts AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG GHOST_URL
ARG GHOST_API
RUN echo "VUE_APP_GHOST_URL=$GHOST_URL" >> .env && \
    echo "VUE_APP_GHOST_KEY=$GHOST_API" >> .env && \
    npm run build

FROM nginx:alpine-slim AS production
RUN apk add --no-cache tzdata
ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
