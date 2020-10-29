const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
//const routes = require('./routes')



  const Questions = [
    {
    id: 1,
    question: "how old are you?",
    respondent_options: [
        {
        id: 1,
        answer: "20-25",
        type: 1 
        }
    ]}, 
    {
    id: 2,
    question: "Where are you located?",
    respondent_options: [
        {
        id: 1,
        answer: "Surabaya",
        type: 1 
        },
        {
        id: 2,
        answer: "Jakarta",
        type: 1
        }
    ]}
  ]

const getQuestion = (args) => {
  const id = args.id
  //console.log("in here")
  const res =  Questions.find(question => {
    return question.id === id
  })

  console.log(res)
  return res
}

const getQuestions = () => {

  return Questions
}

/*

query getSingleQuestion($id: Int!) {
  question(id: $id) {
	  question
  }
}

query getQuestions() {
  questions() {
    question
  }
}
*/

// The root provides a resolver function for each API endpoint
const root = {
  question: getQuestion,
  questions: getQuestions
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
