# =============================================================================
# klaro.davidmaarek.fr — Angular 17 SPA served by nginx
#
# Multi-stage build:
#   Stage 1 (build) — Node compiles the Angular app
#   Stage 2 (runtime) — only the static output + nginx ship in the final image
#
# Final image size: ~12 MB
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1 — Build the Angular app
# -----------------------------------------------------------------------------
FROM node:20.11.1-alpine AS build
WORKDIR /app

# Copy lockfile alone first so `npm ci` is cached when only source changes.
COPY package*.json ./
RUN npm ci

# Copy the rest of the source and produce the production build.
COPY . .
RUN npm run build-prod

# -----------------------------------------------------------------------------
# Stage 2 — Serve with nginx
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Replace the default nginx vhost with our SPA-aware config.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy only the built static assets (Angular 17+ outputs to dist/<app>/browser).
COPY --from=build /app/dist/klaro/browser /usr/share/nginx/html

EXPOSE 80
