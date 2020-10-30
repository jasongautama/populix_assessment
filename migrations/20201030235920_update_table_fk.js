
exports.up = (knex, Promise) => {
    return knex.schema
        .createTableIfNotExists('questions', (table) => {
            table.increments('id').primary()
            table.string('question').notNullable()
        })
        .createTableIfNotExists('respondent_options', (table) => {
            table.increments('id').primary()
            table.string('answer').notNullable()
            table.integer('type').notNullable()
            table.integer('question_id').unsigned().references('id').inTable('questions').onDelete('cascade') //kinda not working?
        })
}

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('respondent_options')
        .dropTableIfExists('questions')
}