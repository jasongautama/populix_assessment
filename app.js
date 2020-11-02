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

app.post('/upload-question', async (req, res) => {
    
    //define graphql query
    const query = 
        `mutation CreateQuestionForPopulix($question: String!, $respondent_options: [RespondentOptionInput!]!){
        createQuestion(question: $question, respondent_options: $respondent_options) {
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

module.exports = app