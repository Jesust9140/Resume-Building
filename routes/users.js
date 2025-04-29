// routes/users.js
// handles all user auth routes

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/usersController');

// show register form
router.get('/register', usersCtrl.showRegister);

// handle register form submit
router.post('/register', usersCtrl.register);

// show login form
router.get('/login', usersCtrl.showLogin);

// handle login submit
router.post('/login', usersCtrl.login);

// logout user
router.get('/logout', usersCtrl.logout);

// export router so we can hook it in server.js
module.exports = router;
