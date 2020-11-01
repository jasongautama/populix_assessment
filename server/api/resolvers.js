const Knex = require('knex')

const client = Knex({ client: 'mysql', connection: {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}})

const data = [
  {
  id: 1,
  question: "how old are you?",
  respondent_options: [
      {
      id: 1,
      answer: "20-25",
      type: 1,
      //questionId: 1,
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
      //questionId: 2,
      },
      {
      id: 2,
      answer: "Jakarta",
      type: 1,
      //questionId: 2,
      }
  ]}
]

let question_id = data.length

const resolvers = {
  Question: {
    respondent_options: (parent) => {
      //get the RespondentOption from knex where id == parent, return response.json
      console.log(parent.respondent_options)
      return parent.respondent_options
    }
  },
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    question: (_, {id}) => {
      return data.find(element =>  element.id === id)
    },
    questions: (_, __, context) => {
      //console.log(context)
      return data
    }
  },
  Mutation: {
    createQuestion: (parent, args) => {
      console.log(args)
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

// const options = [
//   {
//   id: 1,
//   answer: "Surabaya",
//   type: 1
//    },
//   // {
//   // id: 2,
//   // answer: "Jakarta",
//   // type: 1
//   // }
// ]


// const resolvers = {
//   Query: {
//     questions: () => client.from('questions').select('*').then((rows) => {
//       return rows;
//     }),
//     respondent_options: () => {options},
//   },
//   Question: {
//     id: () => 100,
//     question: () => 'this is a fake question',
//   },
//   RespondentOption: {
//     id: (parent) => parent.id,
//     answer: (parent) => parent.answer,
//     type: (parent) => parent.type
//   }
  
// }


// const Questions = [
//   {
//   id: 1,
//   question: "how old are you?",
//   respondent_options: [
//       {
//       id: 1,
//       answer: "20-25",
//       type: 1 
//       }
//   ]}, 
//   {
//   id: 2,
//   question: "Where are you located?",
//   respondent_options: [
//       {
//       id: 1,
//       answer: "Surabaya",
//       type: 1
//       },
//       {
//       id: 2,
//       answer: "Jakarta",
//       type: 1
//       }
//   ]}
// ]

// const resolvers = {
//   Query: {
//     questions: (obj, args, { db }, info) => { return Questions },
//     //respondent_options: (obj, args, { db }, info) => db.respondent_options.findAll(),
//     question: (obj, { id }, { db }, info) => Questions.find(question => question.id === args.id)
//   },
//   Mutation: {
//     createQuestion: (obj, { question, respondent_options }, { db }, info) =>
//       db.question.create({
//         question: question,
//         respondent_options: respondent_options,
//       })
//   },
//   Question: {
//     respondent_options: (obj, args, context, info) => { return obj.respondent_options  },
//   },
//   // RespondentOption: {
//   //   question: (obj, args, context, info) => obj.getQuestion(),
//   // }
// }

// module.exports = resolvers