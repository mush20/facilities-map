FROM node:12 as build

WORKDIR /app

COPY ./package.json ./

RUN yarn install

RUN yarn global add rimraf @nestjs/cli

COPY . .

RUN yarn build

FROM node:12-alpine

COPY --from=build ./app ./

EXPOSE 3001

CMD [ "yarn", "start:prod" ]
