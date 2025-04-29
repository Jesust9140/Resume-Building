// env setup
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require('path');
const flash = require('connect-flash');

// app setup
const app = express();
const PORT = process.env.PORT || 3000;

// connect to database
require('./config/database');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// flash messages
app.use(flash());

// flash messages availiable in all views
app.use(function (req, res, next) {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// load routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const resumeRoutes = require('./routes/resumes');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/resumes', resumeRoutes);

// catch all 404 errors
app.use((req, res) => {
  res.status(404).render('error', { title: '404', message: 'Page Not Found' });
});

// start server
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
