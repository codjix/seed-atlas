# Stage 1: Engine
FROM emscripten/emsdk:6.0.0 as engine

# Setup working directory
WORKDIR /build
COPY . .

# Build engine
WORKDIR /build/packages/engine-wasm
RUN sh ./scripts/build.sh

# Stage 2: Builder
FROM oven/bun:1.3.14-alpine as builder

# Copy source code
WORKDIR /build
COPY . .
COPY --from=engine /build/packages/engine-wasm/dist /build/packages/engine-wasm/dist
RUN bun install --frozen-lockfile

# Build client
WORKDIR /build/apps/client
RUN bun run build

# Stage 3: Production Image
FROM nginx:1.30.3-alpine-slim

# Image info
ARG IMAGE_VERSION=0.0.1
LABEL org.opencontainers.image.title="Voxelen" \
  org.opencontainers.image.description="Modern seed mapping tool for discovering Minecraft biomes and structures with ease." \
  org.opencontainers.image.author="Ibrahim Megahed <codjix@gmail.com>" \
  org.opencontainers.image.source="https://github.com/voxelen/voxelen.git" \
  org.opencontainers.image.url="https://voxelen.github.io" \
  org.opencontainers.image.version="${IMAGE_VERSION}" \
  org.opencontainers.image.vendor="voxelen" \
  org.opencontainers.image.licenses="MIT" \
  bun.version="1.3.14"

# Copy build output
COPY --from=builder /build/apps/client/dist /usr/share/nginx/html
