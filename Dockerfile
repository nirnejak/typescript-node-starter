FROM oven/bun:alpine

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

ENV PORT=9000
EXPOSE 9000

CMD ["bun", "run", "dist/index.js"]
