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

const resolvers = {
  Query: {
    questions: async (obj, args, { db }, info) => { return db.questions.findAll() },
    //respondent_options: (obj, args, { db }, info) => db.respondent_options.findAll(),
    question: async (obj, { id }, { db }, info) => db.questions.findByPk(args.id)
  },
  // Mutation: {
  //   createQuestion: (obj, { question, respondent_options }, { db }, info) =>
  //     db.question.create({
  //       question: question,
  //       respondent_options: respondent_options,
  //     })
  // },
  // Question: { //need to be fix
  //   respondent_options: async (obj, args, context, info) =>  obj.respondent_options ,
  // },
  // RespondentOption: {
  //   question: (obj, args, context, info) => obj.getQuestion(),
  // }
}

module.exports = resolvers

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