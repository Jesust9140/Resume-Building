// controllers/usersController.js
// handles everything related to user authentication: login, register, logout

const bcrypt = require('bcrypt');
const User = require('../models/User');

// show login page
function showLogin(req, res) {
  // render the login form
  res.render('auth/login', { title: 'Login' });
}

// show register page
function showRegister(req, res) {
  // render the registration form
  res.render('auth/register', { title: 'Register' });
}

// handle user registration
async function register(req, res) {
  try {
    // hash the password before saving to database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create new user with hashed password
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    // save user id in session to log them in
    req.session.userId = user._id;

    // flash success message and go to dashboard
    req.flash('success', 'Registration successful!');
    res.redirect('/resumes');
  } catch (err) {
    console.error(err);

    // flash error message if something goes wrong
    req.flash('error', 'Registration failed.');
    res.redirect('/users/register');
  }
}

// handle user login
async function login(req, res) {
  try {
    // look for user by username
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      // if user not found, show error and redirect
      req.flash('error', 'User not found.');
      return res.redirect('/users/login');
    }

    // compare submitted password with database password
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      // if password doesn't match, show error
      req.flash('error', 'Incorrect password.');
      return res.redirect('/users/login');
    }

    // if login successful, save user id in session
    req.session.userId = user._id;

    req.flash('success', 'Successfully logged in!');
    res.redirect('/resumes');
  } catch (err) {
    console.error(err);

    // catch any other errors
    req.flash('error', 'Login failed.');
    res.redirect('/users/login');
  }
}

// handle user logout
function logout(req, res) {
  // destroy the user's session
  req.session.destroy(() => {
    // after logout, send user back to homepage
    res.redirect('/');
  });
}

// export all the functions to use in routes
module.exports = {
  showLogin,
  showRegister,
  register,
  login,
  logout,
};
