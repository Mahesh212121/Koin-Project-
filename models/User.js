var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    allowNull: false
  },
  utc_time: {
    type: String,
    allowNull: false
  },
  operation: {
    type: String,
    allowNull: false
  },
  amount: {
    type: Number,
    allowNull: false
  },
  price: {
    type: Number,
    allowNull: false
  }
});

module.exports = mongoose.model('User', userSchema);
