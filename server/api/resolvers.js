
//TO BE IMPLEMENTED TO CONNECT WITH DB
/*
const Knex = require('knex')

const client = Knex({ client: 'mysql', connection: {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}})
*/
const data = [
  {
  id: 1,
  question: "how old are you?",
  respondent_options: [
      {
      id: 1,
      answer: "20-25",
      type: 1,
      }
  ]},
  {
  id: 2,
  question: "Where are you located?",
  respondent_options: [
      {
      id: 1,
      answer: "Surabaya",
      type: 1,
      },
      {
      id: 2,
      answer: "Jakarta",
      type: 1,
      }
  ]}
]

let question_id = data.length

const resolvers = {
  Question: {
    respondent_options: (parent) => {
      return parent.respondent_options
    }
  },
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    question: (_, {id}) => {
      return data.find(element =>  element.id === id)
    },
    questions: () => {
      return data
    }
  },
  Mutation: {
    createQuestion: (_, args) => {
      const question = {
        id: ++question_id,
        question: args.question,
        respondent_options: args.respondent_options,
      }
      data.push(question)
      return question
    }
  }
}

module.exports = resolvers