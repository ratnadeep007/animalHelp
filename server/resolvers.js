import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default {
  Query: {
    allAnimals: async (parent, args, ctx) => {
      const animals = await ctx.Animal.find();
      return animals.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },
    animalsOwned: async (parent, { filter }, { Animal }) => {
      const animals = await Animal.find({ owned: filter });
      return animals.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },
    singleAnimal: async (parent, { filter }, { Animal }) => {
      const animals = await Animal.find({ _id: filter });
      return animals.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },
  },
  Mutation: {
    addAnimal: async (parent, args, ctx, info) => {
      const { user } = getUserId(ctx);
      console.log(user);
      console.log(args);
      const { name, type } = args
      const dataToDb = {
        name: name,
        type: type,
        foundBy: user.name
      }
      console.log(dataToDb);
      const animal = await new ctx.Animal(dataToDb).save();
      animal._id = animal._id.toString();
      return animal;
    },
    updateAnimalOwner: async (parent, args, ctx) => {
      const animal = await ctx.Animal.findOneAndUpdate(args, { owned: true }, { new: true }).exec();
      return animal;
    },
    register: async(parent, args, { User, SECRET }) => {
      const user = args;
      const userPresence = await User.findOne({ email: user.email});
      if(!userPresence) {
        user.password = await bcrypt.hash(user.password, 12);
        const userSave = await new User(user).save();
        const token = jwt.sign(
          {
            user: _.pick(user, ['_id', 'name', 'email'])
          },
          SECRET,
          {
            expiresIn: '1h',
          }
        )
        return token;
      } else {
        throw new Error('User already present with this email address');
      }
    },
    login: async(parent, { email, password }, { User, SECRET }) => {
      const user = await User.findOne({ email: email});
      if(!user) {
        throw new Error('No user found with this email');
      }
      const valid  = await bcrypt.compare(password, user.password);
      if(!valid) {
        throw new Error('Incorrect password');
      }
      const token = jwt.sign(
        {
          user: _.pick(user, ['_id', 'name', 'email'])
        },
        SECRET,
        {
          expiresIn: '1h',
        }
      )
      return token;
    }
  },
};

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  if(Authorization) {
    const token  = Authorization.replace('Bearer ', '')
    const user = jwt.verify(token, ctx.SECRET)
    return user
  }
  throw new Error('Not Authenticated')
}