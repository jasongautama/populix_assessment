const express = require('express')
const fetch = require('node-fetch')
const app = express()

app.use(express.json())

app.get('/questions', async (_, res) => {
    await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query: `query { questions {
        id
        question
        respondent_options {
          id
          answer
          type
        }
    }}`})
    })
    .then (res => res.json())
    .then(data => res.send(data))
    .catch (err => console.log(err))
})

app.get('/question/:id', async (req, res) => {

  let query = `query GetQuestion($id: Int) { 
    question(id: $id) {
    id
    question
    respondent_options {
      id
      answer
      type
    }
  }}`

  const variables = {
    id: parseInt(req.params.id),
  }

  await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query, variables})
    })
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

app.post('/upload-question', async (req, res) => {
    
    //define graphql query
    const query = 
        `mutation CreateQuestionForPopulix($question: String!, $respondent_options: [RespondentOptionInput!]!){
        createQuestion(question: $question, respondent_options: $respondent_options) {
          id
          question
          respondent_options {
            id
            answer
            type
          }
        }
      }`

      const variables = {
          question: req.body.question,
          respondent_options: req.body.respondent_options
      }
      
    
    await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query, variables})
    })
    .then (res => res.json())
    .then(data => res.send(data))
    .catch (err => console.log(err))
})

app.post('/update-question/:questionId', async (req, res) => {
  //req.params.questionId

  const query = 
  `mutation UpdateQuestionForPopulix($id: Int, $question: String!, $respondent_options: [RespondentOptionInput]){
  updateQuestion(id: $id, question: $question, respondent_options: $respondent_options) {
    id
    question
    respondent_options {
      id
      answer
      type
    }
  }
}`

  const variables = {
    id: parseInt(req.params.questionId),
    question: req.body.question,
    respondent_options: req.body.respondent_options || null
  }

  console.log(variables)

  await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query, variables})
  })
  .then (res => res.json())
  .then(data => res.send(data))
  .catch (err => console.log(err))
})

module.exports = app