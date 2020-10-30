const { test, expect, it } = require("@jest/globals")
const express = require('express')
const schema = require('../server/api/schema')

const app = require('../src/app')
const supertest = require('supertest')
const request = supertest(app)

/*
https://rahmanfadhil.com/test-express-with-supertest/

https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest

*/

//it and test are the same
//describe -- creates a block of 'it' aka grouping of tests(it) 

it('gets the test endpoint', () => {
    //const response = await request.get('/test')
    return request
        .get('/test')
        .expect(200)
    //expect(response.status).toBe(200)
    //expect(response.body.message).toBe('pass!')
})

// it('POST /upload-question')

// it('POST /update-question/{id}')

// it('GET /question/{id}')

// it('POST /delete-question/:id')

// it('POST /update-questions-order') //pass Questions as post

// it('POST /delete-answer/{questionId}')

it('GET /questions', async () => {
    //post request to DB
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
        // ,{
        // id: 2,
        // question: "Where are you located?",
        // respondent_options: [
        //     {
        //     id: 1,
        //     answer: "Surabaya",
        //     type: 1 
        //     },
        //     {
        //     id: 2,
        //     answer: "Jakarta",
        //     type: 1
        //     }
        // ]}
    ]

    //get request from DB
    return await request
        .get('/questions')
        .expect(200)
        .then((res) => {

            //check response type and length
            expect(Array.isArray(res.body)).toBeTruthy()
            expect(res.body.data.questions.length).toEqual(Questions.length)
            
            //id
            expect(res.body.data.questions[0].id).toBe(Questions[0].id)
            
            //questions
            expect(res.body.data.questions[0].question).toBe(Questions[0].question)
            
            //respondent_options
            expect(res.body.data.questions[0].respondent_options.length).toEqual(Questions[0].respondent_options.length)
            expect(res.body.data.questions[0].respondent_options[0].id).toEqual(Questions[0].respondent_options[0].id)
            expect(res.body.data.questions[0].respondent_options[0].answer).toEqual(Questions[0].respondent_options[0].answer)
            expect(res.body.data.questions[0].respondent_options[0].type).toEqual(Questions[0].respondent_options[0].type)

        })
})


