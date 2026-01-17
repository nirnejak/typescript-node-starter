FROM oven/bun:alpine

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN bun install && \
    bun run build

ENV PORT=9000

CMD ["bun", "run", "dist/index.js"]

EXPOSE 9000