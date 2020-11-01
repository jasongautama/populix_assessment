// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:     '127.0.0.1',
      user:     'root',
      password: 'password',
      database: 'populix_dev',
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host:     '127.0.0.1',
      user:     'root',
      password: 'password',
      database: 'populix_dev',
    }
  },
  migrations: { //make changes to DB (add table, drop column)
    directory: __dirname + './knex/migrations'

  },
  seeds: { //to populate a DB w/ sample or mock data
    directory: __dirname + './knex/seeds'
  }

}
