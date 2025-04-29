// models/Resume.js
// this file defines how our resume data is structured in the database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// resume schema (belongs to a user basically)
const resumeSchema = new Schema({
  fullName: {
    type: String,
    required: true, // gotta have a name
  },
  email: {
    type: String,
    required: true, // email is needed too
  },
  education: {
    type: String,
    required: true, // what school or training
  },
  experience: {
    type: String,
    required: true, // work history stuff
  },
  skills: {
    type: String,
    required: true, // skills like coding, design, etc
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // links back to User who owns this
    required: true, // must belong to someone
  }
}, { timestamps: true }); // auto adds createdAt and updatedAt fields

// export model so we can use it in controllers
module.exports = mongoose.model('Resume', resumeSchema);
