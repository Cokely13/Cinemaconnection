//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Quarterback = require('./models/Quarterback')
const Receiver = require('./models/Receiver')

//associations could go here!
Quarterback.hasMany(Receiver);
Receiver.belongsTo(Quarterback);

module.exports = {
  db,
  models: {
    User,
    Quarterback,
    Receiver
  },
}
