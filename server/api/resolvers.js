const Knex = require('knex')

const knex = Knex({ client: 'mysql', connection: {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}})

let data = [
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
    question: (_, {id}) => {
      return data.find(element =>  element.id === id)
    },

    // questions: () => {
    //   return data
    // }
    
    questions: async () => {
      //return data
      var dataArr = []
      var respondArr = []
      await knex('questions')
        .select()
        .then((res) => {
          dataArr = res
          return dataArr
        })
      
    
      await knex('respondent_options')
      .select()
      .then((res) => {
        respondArr = res

        return respondArr
      })

      //create array and filter respondArr.question_id == dataArr.id
      dataArr.forEach((question) => {
        const respondent_option = respondArr.filter(res => res.question_id === question.id)
        question.respondent_options = respondent_option
        
      })

      return dataArr


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
    },
    updateQuestion: (_, args) => {
      var returnVal = null
      
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === args.id) { //found the question to update
          if (args.question === undefined || args.question !== "null")
            data[i].question = args.question

          if (args.respondent_options !== null)  {
            data[i].respondent_options = args.respondent_options  
          }
          returnVal = data[i]
          break      
        }
      }

      return returnVal
    },
    deleteQuestion: (_, {id}) => {
      const res = data.filter((data) => data.id !== id)

      //meaning no data has been deleted
      if (data.length === res.length) {
        return null
      }

      data = res

      return `successfully delete question ID = ${id}`
    }
  }
}

module.exports = resolvers