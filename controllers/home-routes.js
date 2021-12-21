const router = require('express').Router();
const mysql = require('mysql2')
const { User} = require('../models');


router.post('/create', async (req, res) => {
  try{
  const dbUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  res.json(dbUser)
}
catch(err){
  res.status(500).json(err)
}
})

router.get('/get', async (req, res) => {
  try{
    const dbUserdata = await User.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'description'],
        },
      ],
  })

    const userData = dbUserdata.map((users) => {
      users.get({plain:true})
      
    })
    return res.json(userData)
    console.log("shit")
  }
  catch(err){
    res.status(500).json
  }
})
//db
router.get('/get', async (req, res) => {
  try{
   
  
  }
  catch(err){
    res.status(500).json
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

module.exports = router;
