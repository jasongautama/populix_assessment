
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {id: 1, question: 'how old are you?'},
        {id: 2, question: 'what is your gender?'}
      ]);
    });
};
