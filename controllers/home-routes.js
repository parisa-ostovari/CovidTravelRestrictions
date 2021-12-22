const router = require('express').Router();
const mysql = require('mysql2')
const { User } = require('../models');


// Home page route
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('homepage');
});


// Saved-destination route
router.get('/saved', async (req, res) => {
  try{
    const dbUserdata = await User.findAll()
    console.log(dbUserdata)
    const userData = dbUserdata.map((user) => {
      return user.get({plain:true})
    })
  res.render('saved', {userData})
  }
  catch(err){
    res.status(500).json(err)
  }
})

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
