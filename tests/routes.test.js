const { test, expect } = require("@jest/globals")
const express = require('express')
const schema = require('../src/schema')

const app = require('../src/app')
const supertest = require('supertest')
const request = supertest(app)

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


it('GET /questions', async () => {
    //post request to DB
    const question; // = ...

    //get request from DB
    return await request
        .get('/questions')
        .expect(200)
        .then((res) => {

            //check response type and length
            expect(Array.isArray(res.body)).toBeTruthy()
            expect(res.body.data.questions.length).toEqual(1)
            expect(res.body.data.questions.id).toBe(question.id)
            expect(res.body.data.questions.id).toBe(question.question)
			// expect(res.body[0].title).toBe(post.title)
            // expect(res.body[0].content).toBe(post.content)
        })
})


