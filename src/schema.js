const { gql } = require("apollo-server-express");

// Define the GraphQL schema
const typeDefs = gql`
  # Define a User type
  type User {
    id: ID!
    name: String!
    email: String!
  }

  # Define the Query type (Read Operations)
  type Query {
    users: [User] # Returns a list of users
    user(id: ID!): User # Returns a specific user
  }

  input UserInputFields {
    name: String
    email: String
  }
  # Define the Mutation type (Write Operations)
  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, input: UserInputFields): User
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;
