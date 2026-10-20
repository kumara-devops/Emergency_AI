
# Stage 1: Build the React application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files and install packages
COPY package*.json ./
RUN npm ci

# Copy the existing frontend source code
COPY . .

# Build the production frontend
RUN npm run build

# Stage 2: Serve the frontend using Nginx
FROM nginx:stable-alpine

# Copy the compiled frontend files
COPY --from=build /app/dist /usr/share/nginx/html

# Add our Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
