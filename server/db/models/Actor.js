const Sequelize = require('sequelize')
const db = require('../db')


const Actor = db.define('actor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});


module.exports = Actor
