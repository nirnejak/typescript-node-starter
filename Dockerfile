FROM alpine
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN apk update && \
    apk add git nodejs npm

RUN npm install -g bun && \
    bun install && \
    bun run build



ENV PORT=9000

CMD ["node", "dist/index.js"]

EXPOSE 9000
