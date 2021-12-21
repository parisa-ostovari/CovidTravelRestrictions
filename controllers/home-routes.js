const router = require('express').Router();
const mysql = require('mysql2')
const { User} = require('../models');


router.post('/create', async (req, res) => {
  try{
  const dbUser = await User.create({
    email: req.body.email,
    password: req.body.password
  })
  res.json(dbUser)
}
catch(err){
  res.status(500).json(err)
}
})

router.get('/coolkids', async (req, res) => {
  try{
    const dbUserdata = await User.findAll()
    console.log(dbUserdata)
    const userData = dbUserdata.map((user) => {
      return user.get({plain:true})
      
    })
    res.json(userData)
    console.log("shit")
  }
  catch(err){
    res.status(500).json(err)
  }
})
//db
// router.get('/get', async (req, res) => {
//   try{
   
  
//   }
//   catch(err){
//     res.status(500).json
//   }
// })
//making third party api calls with proxy server in express.js

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
