const fetch = require('node-fetch')

exports.getQuestions = async (_, res) => {
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
      .then (res => {
        if (res.ok) {return res.json()}
        else {console.log("failed to get questions")}
      })
      .then(data => {
        (data !== undefined) ? res.status(200) : res.status(400)
        res.send(data)
      })
      .catch (err => console.log(err))
};

exports.getQuestionById = async (req, res) => {

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
      .then (res => {
        if (res.ok) {return res.json()}
        else {console.log("failed to get question")}
      })
      .then(data => {
        (data !== undefined) ? res.status(200) : res.status(400)
        res.send(data)
    })
      .catch(err => console.log(err))
  }

  exports.uploadQuestion = async (req, res) => {
    
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
    .then (res => {
        if (res.ok) {return res.json()}
        else {console.log("failed to upload question")}
    })
    .then(data => {
        (data !== undefined) ? res.status(200) : res.status(400)
        res.send(data)
    })
    .catch (err => console.log(err))
}

exports.updateQuestion = async (req, res) => {
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

  
    await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query, variables})
    })
    .then (res => {
        if (res.ok) {return res.json()}
        else { console.log("failed to update question")}
    })
    
    .then(data => {
        (data !== undefined) ? res.status(201) : res.status(400)
        res.send(data)
    })
    .catch (err => console.log(err))
  }
  
  exports.deleteQuestion = async (req, res) => {
    const query = 
    `mutation DeleteQuestionForPopulix($id: Int){
    deleteQuestion(id: $id) 
    }`
    
    const variables = {
      id: parseInt(req.params.questionId),
    }
  
    await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query, variables})
    })
    .then (res => {
        if (res.ok) { return res.json() }
        else { console.log("failed to delete question") }
    })
    .then(data => {
        (data !== undefined) ? res.status(200) : res.status(500)
        res.send(data)
    })
    .catch (err => console.log(err))
  
  }