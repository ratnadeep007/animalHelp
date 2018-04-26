 FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install && npm run build
EXPOSE 3000
CMD [ "npm", "run", "now-start"]