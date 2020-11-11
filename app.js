const express = require('express')
const fetch = require('node-fetch')
const app = express()
var question = require('./server/api/routes/question')
app.use(express.json())

app.get('/questions', question.getQuestions)

app.get('/question/:id', question.getQuestionById)

app.post('/upload-question', question.uploadQuestion)

app.put('/update-question/:questionId', question.updateQuestion)

app.delete('/delete-question/:questionId', question.deleteQuestion)

module.exports = app