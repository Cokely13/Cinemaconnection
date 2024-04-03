const Sequelize = require('sequelize')
const db = require('../db')


const Movie = db.define('movie', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = Movie
