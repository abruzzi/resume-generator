const db = require('../db.json')
const users = db.users

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {id: 1, profile: users[0]},
        {id: 2, profile: users[1]},
        {id: 3, profile: users[2]}
      ]);
    });
};
