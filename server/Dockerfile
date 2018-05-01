FROM node:latest
RUN apt-get update && apt-get install -y build-essential python
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install && npm run build
EXPOSE 3000
CMD [ "node", "build/index.js"]