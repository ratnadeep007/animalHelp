import { GraphQLServer, Options } from 'graphql-yoga';
import mongoose from 'mongoose';

import typeDefs from './schema';
import resolvers from './resolvers';
import { animalSchema, userSchema } from './dbSchema';

// Not required for running the server. Just for console styling
const chalk = require('chalk').bgGreen.black;
import shell from 'shelljs';

// For local development
// mongoose.connect("mongodb://localhost/test"); 

// For docker
// mongoose.connect("mongodb://mongo:27017/test");

// For mongo atlas
mongoose.connect("mongodb://ronnie:ratnadeep@cluster0-shard-00-00-itdq6.mongodb.net:27017,cluster0-shard-00-01-itdq6.mongodb.net:27017,cluster0-shard-00-02-itdq6.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin")

const SECRET = "youmustnottellanyoneyoursecrets";

const Animal = mongoose.model('Animal', animalSchema);
const User = mongoose.model('User', userSchema);

const options = {
  port: 3000,
  endpoint: '/graphql',
  playground: '/playground'
}

const context = async ({request}) => {
  const object = {
    Animal,
    User,
    SECRET,
    request
  }
  return object;
};

const server = new GraphQLServer({typeDefs, resolvers, context});

server.start(options, ({port}) => {
  shell.exec('clear', () => {
    console.log(chalk(`Server started at localhost:${port}`));
    console.log('Endpoints:');
    console.log(`Graphql endpoint at \\graphql`);
    console.log(`Graphql Playground endpoint at \\playground`);
    console.log(' ');
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
      console.log(chalk(`Server started at ${add}:${port}`));
      console.log(`Graphql endpoint at ${add}:${port}\\graphql`);
      console.log(`Graphql Playground endpoint at ${add}:${port}\\playground`);
    });
  })
});
