const Sequelize = require('sequelize')
const db = require('../db')


const Actor = db.define('actor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagePath: {
    type: Sequelize.TEXT,
    defaultValue: "/Generic.png"
  },
});


module.exports = Actor
