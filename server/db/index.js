//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Actor = require('./models/Actor')
const Movie = require('./models/Movie')

//associations could go here!
Actor.hasMany(Movie);
Movie.belongsTo(Actor);

module.exports = {
  db,
  models: {
    User,
    Actor,
    Movie
  },
}
