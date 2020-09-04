const mongoose = require('mongoose');
const database = require('../config/database.config')

module.exports = function () {
    mongoose.connect(database.MONGO_URI, {useNewUrlParser: true})
      .then(() => console.log('MongoDB connected...'))
      .catch(err => console.error(err))
  }