// controllers/resumesController.js
// handles all resume-related actions for logged-in users

const Resume = require('../models/Resume');

// list all resumes for the logged-in user
async function index(req, res) {
  try {
    // find resumes that belong to the current user
    const resumes = await Resume.find({ owner: req.session.userId });

    // render the dashboard view with the user's resumes
    res.render('resumes/index', { resumes, title: 'Dashboard' });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
}

// show the form to create a new resume
function newResume(req, res) {
  // just render the new resume form
  res.render('resumes/new', { title: 'Create Resume' });
}

// handle creating a new resume
async function create(req, res) {
  try {
    // create a new resume with form data
    const resume = await Resume.create({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      education: req.body.education,
      experience: req.body.experience,
      skills: req.body.skills,
      owner: req.session.userId // set the logged-in user as the owner
    });

    // show success message and redirect back to dashboard
    req.flash('success', 'Resume created successfully!');
    res.redirect('/resumes');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error creating resume');
    res.redirect('/resumes/new');
  }
}

// show a single resume's details
async function show(req, res) {
  try {
    // find resume by its id
    const resume = await Resume.findById(req.params.id);

    // if no resume found, send back to dashboard
    if (!resume) return res.redirect('/resumes');

    // render the single resume page
    res.render('resumes/show', { resume, title: 'View Resume' });
  } catch (err) {
    console.error(err);
    res.redirect('/resumes');
  }
}

// show form to edit an existing resume
async function edit(req, res) {
  try {
    // find resume by its id
    const resume = await Resume.findById(req.params.id);

    // if no resume found, send back to dashboard
    if (!resume) return res.redirect('/resumes');

    // render the edit form view
    res.render('resumes/edit', { resume, title: 'Edit Resume' });
  } catch (err) {
    console.error(err);
    res.redirect('/resumes');
  }
}

// handle updating a resume
async function update(req, res) {
  try {
    // find resume by id and update it with new data
    await Resume.findByIdAndUpdate(req.params.id, req.body);

    // after updating, redirect to dashboard
    res.redirect('/resumes');
  } catch (err) {
    console.error(err);
    res.redirect('/resumes');
  }
}

// handle deleting a resume
async function deleteResume(req, res) {
  try {
    // find resume by id and delete it
    await Resume.findByIdAndDelete(req.params.id);

    // after deleting, redirect to dashboard
    res.redirect('/resumes');
  } catch (err) {
    console.error(err);
    res.redirect('/resumes');
  }
}

// export the functions so we can use them in routes
module.exports = {
  index,
  new: newResume,
  create,
  show,
  edit,
  update,
  delete: deleteResume,
};
