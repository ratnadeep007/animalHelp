import express  from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import cors from 'cors';
mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({name: 'Test Cat'});
// kitty.save().then(() => console.log('done'));

// Cat.find({}, (err, data) => {
//   console.log(data);
// });

const typeDefs = `
type Cat {
  _id: String!
  name: String!
}
type Query {
  allCats: [Cat!]!
}

`;

const resolvers = {
  Query: {
    allCats: async (parent, args, { Cat }) => {
      // { _id: 123123, name: "whatever"}
      const cats = await Cat.find();
      return cats.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },
  }
}
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

const PORT = 3000;

const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { Cat } }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, (err) => {
  if(err) console.log(err);
  console.log('Server started');
});