exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('profiles', table => {
      table.increments('id').primary()
      table.jsonb('profile')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('profiles')
  ])
}
