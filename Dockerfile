FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VUE_APP_GHOST_URL
ENV VUE_APP_GHOST_URL=$VUE_APP_GHOST_URL
ARG VUE_APP_GHOST_KEY
ENV VUE_APP_GHOST_KEY=$VUE_APP_GHOST_KEY
RUN npm run build

FROM nginx:alpine-slim as production
RUN apk add --no-cache tzdata
ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
