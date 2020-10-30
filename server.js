const express = require('express')
//const { graphqlHTTP } = require('express-graphql')
const typeDefs = require('./server/api/schema')
const resolvers = require('./server/api/resolvers')
const { ApolloServer } = require ('apollo-server-express')
const db = require('./server/api/models')

const knex = require('./knex/knex.js')

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: {db}

})
const app = express();

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
 console.log(`Running a GraphQL API server at http://localhost:4000/graphql`);
})