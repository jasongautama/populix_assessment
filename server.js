const { ApolloServer } = require ('apollo-server-express')
//const { graphqlHTTP } = require('express-graphql')
const db = require('./server/api/models')
const typeDefs = require('./server/api/schema')
const resolvers = require('./server/api/resolvers')
//const knex = require('./knex/knex.js')

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  //rootValue: data,
  //context: data

})
const app = require('./app')

server.applyMiddleware({ app })

const myServer =  app.listen({ port: 4000 }, () => {
 console.log(`Running a GraphQL API server at http://localhost:4000/graphql`);
})

module.exports = myServer