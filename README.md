# Animal Help
### Technical Details
- Frontend - React (A open-source Javascript Library by Facebook for creating UI)
- Backend - GraphQL server using Node.JS
- Storage - Using MongoDB
### How to run
#### Requirements
##### Running locally
> IMPORTANT!
> You need Node.JS and MongoDB(if you don't wnat to use provided mongodb atlast link) > installed on your system
> 
Clone the repo from: [Git Link](https://github.com/ratnadeep007/animalHelp)
Install dependencies and run using following:
```sh
npm install && npm start
```
##### Using Docker
Install docker and run the script ```run.sh```
Change server address in client app ```client/src/App.js``` to point to server container.
Install docker compose also if you don't want to use Mongo Atlas and uncomment following in ```server/src/index.js```:
```js
mongoose.connect("mongodb://mongo:27017/test");
```
and comment for Mongo Atlas one and run ```run.compose.sh```

##### Deployed
Project is already deployed using [now.sh](now.sh) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
Using Zeit's now.sh to deploy project. Frontend using static deployment of now.sh and backemd using docker deployment of now.sh and persistent data using Mongo Atlas.
Frontend Link: [Click here](https://animalhelp-csoldbqwxp.now.sh/)
Backend playground: [Click here](https://server-ryotnwpykc.now.sh/playground)

### Technologies used
#### Development
- Javascript - Programming language for the web. Javascript is programming language which runs on browser for things like animation, XHRRequest etc.
- Node.js - Brings javascript to server-side. It is a javascript runtime that can run javascript code without browser.
- React - It is frontend javascript library by Facebook for building Single Page Application using components based system.
- Graphql-yoga - A graphql server which doesn't need much setup to get started and has inbuild graphql playground(a improved graphiql) with apollo-express-server and other dependencies. It is provided by graphcool a BaaS (Backend as a Service) provider using Graphql
- Graphql - A replacement of REST API by Facebook which uses it's own query language to fetch data effeciently and only needed data saving time and bandwidth.
- Apollo Graphql - Family of technologies you can incrementally add to your stack: Apollo Client to connect data to your UI, Apollo Engine for infrastructure and tooling, and Apollo Server to translate your REST API and backends into a GraphQL schema.
- Reactstrap - A bootstrap implementation for react using react based components and boostrap for css.
### Deployement
- now.sh - A cloud service to deploy apps easily by Zeit. Now makes super easy to deploy projets on cloud using single command ```now``` with option of deploying node.js apps, static site and docker for all other languages.
- Docker - A operating system virtualization technology using LXC which isolates the software and resource for host kernel without much overhead on host kernel like in virtual machine.

### Reference
- Javascript - https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics - Mozilla Docs, https://www.w3schools.com/js/default.asp - w3c docs.
- Node.js - https://nodejs.org/en/, https://nodejs.org/en/docs/ - Docs
- React - https://reactjs.org/, https://reactjs.org/docs/hello-world.html - Docs
- Graphql-yoga - https://github.com/graphcool/graphql-yoga - Github
- Apollo Platform - https://www.apollographql.com/
- Reactstrap - https://reactstrap.github.io/
- now.sh - now.sh
- Docker - docker.com, docs.docker.com