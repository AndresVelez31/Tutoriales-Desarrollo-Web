# Build stage: compile the Vue app
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage: serve the static files with nginx
FROM nginx:alpine

# Copy the dist folder generated in the build stage
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Copy nginx config for SPA routing and API proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
