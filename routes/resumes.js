// routes/resumes.js
// handles all the resume related routes

const express = require('express');
const router = express.Router();
const resumesCtrl = require('../controllers/resumesController');

// show all resumes (dashboard basically)
router.get('/', resumesCtrl.index);

// form to create new resume
router.get('/new', resumesCtrl.new);

// handle creating a new resume
router.post('/', resumesCtrl.create);

// show a single resume
router.get('/:id', resumesCtrl.show);

// form to edit existing resume
router.get('/:id/edit', resumesCtrl.edit);

// handle updating the resume
router.put('/:id', resumesCtrl.update);

// handle deleting a resume
router.delete('/:id', resumesCtrl.delete);

// export router so server.js can use it
module.exports = router;
