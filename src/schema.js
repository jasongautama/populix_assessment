const { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language

//name: String! [non=nullable, meaning that the GraphQL service promises to always give you a value when you query this field]

/*
type Character {
  name: String!
  appearsIn: [Episode]! //array can't be null
             [Episode!] //elements inside array can't be null
}
*/

/*
    type Query { 
        getQuestions(): Questions,
        getQuestion(id: INT!): Question
        mysql_getAllQuestions(): Questions
    }

    https://www.howtographql.com/graphql-js/3-a-simple-mutation/
    https://graphql.org/graphql-js/mutations-and-input-types/

    type Mutation {
        setQuestions(questions: [Question]): Questions
        setQuestion(question: String!, respondent_options: RespondentOption): Question
        updateQuestion(id: Int!, question: String!, respondent_options: RespondentOption): Question
    }
*/

const schema = buildSchema(`

    type Query {
        hello: String
    }

    type Questions {
        id: Int!
        questions: [Question]
    }

    type Question {
        id: Int!
        question: String!
        respondent_options: RespondentOption
    }

    type RespondentOption {
        id: Int!
        answer: String!
        select: SELECTOPTION!
    }

    input QuestionsInput {
        questions: [QuestionInput]
    }

    input QuestionInput {
        question: String
        respondent_options: RespondentOption
    }

    input RespondentOptionInput {
        answer: String
        select: SELECTOPTION
    }

    enum SELECTOPTION {
        MAYSELECT
        MUSTSELECT
        TERMINATESELECT
    }

`)

module.exports = schema