
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

//!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!
//https://www.apollographql.com/docs/apollo-server/schema/directives/
//https://www.npmjs.com/package/graphql-mysql-resolver

const { gql } = require('apollo-server-express')
//const GraphQLJSON, { GraphQLJSONObject } = require('graphql-type-json')

const schema = gql`

    type Question {
        id: Int
        question: String!
        respondent_options: [RespondentOption]
    }

    type RespondentOption {
        id: Int
        answer: String!
        type: Int!
    }

    input QuestionsInput {
        questions: [QuestionInput]
    }

    input QuestionInput {
        question: String
        respondent_options: [RespondentOptionInput]
    }

    input RespondentOptionInput {
        id: Int
        answer: String
        type: Int
    }

    enum SELECTOPTION {
        MAYSELECT
        MUSTSELECT
        TERMINATESELECT
    }

    
    type Query {
        hello(name: String): String!
        question(id: Int): Question
        questions: [Question]
    }
    
    type Mutation {
        createQuestion(id: Int, question: String!, respondent_options: [RespondentOptionInput!]!): Question!
        updateQuestion(id: Int, question: String!, respondent_options: [RespondentOptionInput]): Question
        deleteQuestion(id: Int): String
    }

`

module.exports = schema