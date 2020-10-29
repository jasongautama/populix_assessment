const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
//const routes = require('./routes')

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello World!'
    }
}


const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }))

  app.get('/test', async (req, res) => {
    res.json({message: 'pass!'})
  })

module.exports = app
