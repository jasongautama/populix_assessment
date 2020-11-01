const express = require('express')
const apolloEntities = require('apollo-entities')
const { ApolloServer } = require ('apollo-server-express')
//const { graphqlHTTP } = require('express-graphql')
const db = require('./server/api/models')
const typeDefs = require('./server/api/schema')
const resolvers = require('./server/api/resolvers')

const knex = require('./knex/knex.js')
// require('./server/api/schema')
// require('./server/api/resolvers')

// const { typeDefs, resolvers } = apolloEntities.init(`
//   directive @toOne on FIELD_DEFINITION
//   directive @toMany on FIELD_DEFINITION
// `)


// const data = [
//   {
//   id: 1,
//   question: "how old are you?",
//   respondent_options: [
//       {
//       id: 1,
//       answer: "20-25",
//       type: 1,
//       //questionId: 1,
//       }
//   ]},
//   {
//   id: 2,
//   question: "Where are you located?",
//   respondent_options: [
//       {
//       id: 1,
//       answer: "Surabaya",
//       type: 1,
//       //questionId: 2,
//       },
//       {
//       id: 2,
//       answer: "Jakarta",
//       type: 1,
//       //questionId: 2,
//       }
//   ]}
// ]

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  //rootValue: data,
  //context: data

})
const app = express();

server.applyMiddleware({ app })

app.get('/questions', (req, res) => {
  return res.send('GET all Questions')
})

app.listen({ port: 4000 }, () => {
 console.log(`Running a GraphQL API server at http://localhost:4000/graphql`);
})