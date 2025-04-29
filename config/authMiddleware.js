// auth.js
// this file is to check if user is logged in before letting them see some pages

// Middleware function
function isLoggedIn(req, res, next) {
    // check if user has an active session (aka logged in)
    if (req.session.userId) {
      // yes they are logged in, so let them continue
      return next();
    } else {
      // no session, so user is not logged in
      // send them to login page to sign in first
      res.redirect('/users/login');
    }
  }
  
  // export so we can use it in other files like routes
  module.exports = {
    isLoggedIn,
  };
  