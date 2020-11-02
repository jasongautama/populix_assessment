const { expect, it } = require("@jest/globals")
const app = require('./server')
const request = require('supertest')

const Questions = [
    {
    id: 1,
    question: "how old are you?",
    respondent_options: [
        {
            id: 1,
            answer: "20-25",
            type: 1 
        },
        {
            id:2,
            answer: "25-30",
            type: 2
        }
    ]}
    ,{
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

afterAll(() => {
    return app.close()
})


//it and test are the same
//describe -- creates a block of 'it' aka grouping of tests(it) 
it('GET /questions', () => {

    return request(app)
        .get(`/questions`)
        .set('Accept', 'application/json')
        .expect(200)
        .then(({text}) => {
            var res = JSON.parse(text)

            //check if questions are in array
            expect(Array.isArray(res.data.questions)).toBeTruthy()
            //check the length of data in response
            expect(res.data.questions.length).toEqual(Questions.length)
            //check if question is equal
            expect(res.data.questions[0].question).toBe(Questions[0].question)
            //check if answer inside question is equal
            expect(res.data.questions[0].respondent_options[0].answer).toBe(Questions[0].respondent_options[0].answer)
        })
})

let query = {
    question: "Who are you?",
    respondent_options: [
        {
          id: 1,
          answer: "Jason",
          type: 1
        },
        {
          id: 2,
          answer: "Jennie",
          type: 3
        }
    ]
}

it('POST /upload-question', () => {
    return request(app)
        .post('/upload-question')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(query)
        .expect(200)
        .then(({text}) => {
            var res = JSON.parse(text)
            //no need to be exactly equal all Obj keys and values 
            //console.log(data)
            expect(res.data.createQuestion).toMatchObject(query) 
        })

})

// it('POST /update-question/{id}')

// it('GET /question/{id}')

// it('POST /delete-question/:id')

// it('POST /update-questions-order') //pass Questions as post

// it('POST /delete-answer/{questionId}')