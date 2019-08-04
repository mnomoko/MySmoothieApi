FROM node:10.15.0-alpine

WORKDIR /app
COPY . /app
RUN cd /app && npm install && npm run compile
RUN cd /app/dist

CMD npm run start
