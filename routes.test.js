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

const query = {
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
            //console.log(res)
            
            //no need to be exactly equal all Obj keys and values 
            expect(res.data.createQuestion).toMatchObject(query) 
        })

})

//get question where id = {id}
//change the question, respondent_options data (UPDATE)
const query1 = {
    id: 3, //given ID = 3
    question: "What is your name?", //change from "who are you" to "what is your name"
    respondent_options: [
        {
          id: 1,
          answer: "Jason",
          type: 1
        },
        {
          id: 2,
          answer: "Johnny",
          type: 3
        }
    ]
}
it('POST /update-question/{id}', () => {
    return request(app)
        .post(`/update-question/${query1.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(query1)
        .expect(200)
        .then(({text}) => {
            var res = JSON.parse(text)
            //console.log(res)

            expect(res.data.updateQuestion.id).toEqual(query1.id)
            expect(res.data.updateQuestion.question).toEqual(query1.question)
            expect(res.data.updateQuestion.respondent_options).toEqual(query1.respondent_options)
        })


})

const query2 = {
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
    ]
}


it('GET /question/{id}', () => {
    return request(app)
        .get(`/question/${query2.id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .then(({text}) => {
            var res = JSON.parse(text)
            console.log(res)
            expect(res.data.question.id).toEqual(query2.id)
            expect(res.data.question.question).toEqual(query2.question)
            expect(res.data.question.respondent_options).toEqual(query2.respondent_options)
        })
})

// })

// it('POST /delete-question/:id')

// it('POST /update-questions-order') //pass Questions as post

// it('POST /delete-answer/{questionId}')


afterAll(() => {
    return app.close()
})
