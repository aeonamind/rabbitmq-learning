FROM oven/bun:1.1.20-slim AS base
WORKDIR /usr/src/app

FROM base AS install
COPY apps/fake-victim/package.json bun.lockb ./
RUN bun install
RUN bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY tsconfig.json .
COPY packages ./packages
COPY apps/fake-victim/tsconfig.json ./apps/fake-victim/tsconfig.json
COPY apps/fake-victim/src ./apps/fake-victim/src
ENTRYPOINT [ "bun", "run", "apps/fake-victim/src/main.ts" ]