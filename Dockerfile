FROM alpine
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN apk update && \
    apk add git nodejs npm && \
    npm install && \
    npm run build

ENV PORT=5000

CMD npm start

EXPOSE 5000