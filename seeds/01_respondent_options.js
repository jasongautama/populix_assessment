
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('respondent_options').del()
    .then(function () {
      // Inserts seed entries
      return knex('respondent_options').insert([
        {id: 1, answer: '20-25', type: 1, question_id: 1},
        {id: 2, answer: '25-30', type: 2, question_id: 1},
        {id: 3, answer: 'Male', type: 1, question_id: 2},
        {id: 4, answer: 'Female', type: 2, question_id: 2}
      ]);
    });
};
