# Step 1: Use a Node image for building the frontend
FROM node:20 as build

WORKDIR /app
COPY . .

# Install dependencies and Tailwind in one go
RUN npm install

# Optional: force Tailwind setup if not already in package.json (add tailwind/postcss/autoprefixer)
# RUN npm install -D tailwindcss postcss autoprefixer
# RUN npx tailwindcss init -p

# Step 2: Build the frontend for production
RUN npm run build

# Step 3: Use a tiny webserver for static files (optional, can use nginx or serve)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (Hugging Face Spaces expects this)
EXPOSE 80

# No CMD needed—nginx will serve index.html
