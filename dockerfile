# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json .npmrc ./

# NSO proxy: эхлээд 2 package tarball-аар суулгана
RUN mkdir -p /tmp/npm-packs \
  && npm pack levn@0.4.1 side-channel-weakmap@1.0.2 \
    --pack-destination /tmp/npm-packs \
    --registry https://registry.npmmirror.com \
  && npm install \
    /tmp/npm-packs/levn-0.4.1.tgz \
    /tmp/npm-packs/side-channel-weakmap-1.0.2.tgz \
    --no-save --legacy-peer-deps --no-audit \
  && npm ci --legacy-peer-deps --no-audit

FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
