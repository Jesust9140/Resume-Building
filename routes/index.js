// routes/index.js
// main homepage route

const express = require('express');
const router = express.Router();

// homepage (basic landing page)
router.get('/', (req, res) => {
  // render the homepage view
  res.render('index', { title: 'Home' });
});

// export router so we can plug into server.js
module.exports = router;
