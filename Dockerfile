FROM node:8.10.0

RUN mkdir -p /nest
ADD . /nest
WORKDIR /nest

RUN npm i -g @nestjs/cli && npm i -D concurrently