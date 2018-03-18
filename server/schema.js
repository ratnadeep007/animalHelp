export default `

type Animal {
  _id: String!
  name: String!
  type: String!
  owned: Boolean!
  owner: String
  foundBy: String!
}

type User {
  _id: String!
  name: String!
  email: String!
}

type Query {
  allAnimals: [Animal!]!,
  animalsOwned(filter: Boolean!): [Animal!]!
  singleAnimal(filter: String!): [Animal!]!
}

type Mutation {
  addAnimal(name: String!, type: String!, owned: Boolean, owner: String, foundBy: String): Animal!
  updateAnimalOwner(_id: String!): Animal!
  register(name: String!, email: String!, password: String!): User!
  login(email: String!, password: String!): String!
}

`;
