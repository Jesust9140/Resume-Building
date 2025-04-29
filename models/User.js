const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema (basic, for login/register)
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // no duplicate usernames
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // automatically adds createdAt and updatedAt
// export so we can use it in auth controllers
module.exports = mongoose.model('User', userSchema);
