const { connectToDb } = require('./db');
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

connectToDb();

const app = express();

async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(process.env.PORT, () => {
    console.log('Server on port', process.env.PORT);
  });
}

start();
