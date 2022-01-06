FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY public/ public/
COPY src/ src/

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
