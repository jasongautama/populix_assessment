const express = require('express')
//const { graphqlHTTP } = require('express-graphql')
const typeDefs = require('../server/api/schema')
const resolvers = require('../server/api/resolvers')
const { ApolloServer } = require ('apollo-server-express')
const db = require('../server/api/models')

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: {db}

})
const app = express();

server.applyMiddleware({ app })

module.exports = app