// config/database.js
// this file is just to connect our app to the MongoDB database

const mongoose = require('mongoose');

// connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // this is old but still safe to include
  useUnifiedTopology: true, // this option makes the connection cleaner, thank you internet
})

// if connection works 
.then(() => console.log('MongoDB connected'))

// if connection fails 
.catch((err) => console.error('MongoDB connection error:', err));
