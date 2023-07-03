# Stage 1: Build
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/interfaz /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]