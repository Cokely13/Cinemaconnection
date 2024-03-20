const Sequelize = require('sequelize')
const db = require('../db')


const Receiver = db.define('receiver', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});


module.exports = Receiver
