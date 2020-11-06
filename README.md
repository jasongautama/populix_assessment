We are looking for you to develop the backend for a small app with limited functionality. Visit https://jonathanarde.github.io/ to see the app.

Features summary:
- adding/removing/editing of questions
- defining the question (textarea)
- defining/deleting answer options
- dragging/dropping of questions
- saving a current state of the question

Your task:
Develop the backend using Node + Express.js + MySQL (use any ORM library of your choice). Write unit and functional tests for your code following the TDD principle (use testing library of your choice). Push your code to github/your version control preference.

########################################################################

to run program:
    npm run start
    
to run jest:
    npm run test

Description:
I am using Graphql with an API end-point for client.

Currently, data is static (located in /server/api/resolvers.js). 

In progress to store data in MySQL. With the help of Knex.js, I was able to run migration and seeds to populate the DB in MySQL

Current implemented API routes:
    
    # POST /upload-question
    
    # GET /questions

    # POST /update-question/:questionId

    # GET /question/{id}
    
    # POST /delete-question/{id}

Next Step:
    
1. hook up to Database and fetch data from there

Sample POST request in json format to upload-question:

        POST http://localhost:4000/upload-question
        Body: {"question": "Who are you?", "respondent_options": [{"id":1, "answer":"Jason", "type": 1}, {"id":2, "answer":"Jennie", "type": 3}] }


Sample of json result when get all questions (GET /questions):

        {
        "data": {
            "questions": [
                {
                    "id": 1,
                    "question": "how old are you?",
                    "respondent_options": [
                        {
                            "id": 1,
                            "answer": "20-25",
                            "type": 1
                        }
                    ]
                },
                {
                    "id": 2,
                    "question": "Where are you located?",
                    "respondent_options": [
                        {
                            "id": 1,
                            "answer": "Surabaya",
                            "type": 1
                        },
                        {
                            "id": 2,
                            "answer": "Jakarta",
                            "type": 1
                        }
                    ]
                }
            ]}
        }