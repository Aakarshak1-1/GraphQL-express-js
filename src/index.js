const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');  // Import Mongoose
const typeDefs = require('./schema');   
const resolvers = require('./resolvers'); 

const app = express();

// Connect to MongoDB
const MONGO_URI = "mongodb://graphql:graphql@localhost:27017/graphqlDB";

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

startServer();