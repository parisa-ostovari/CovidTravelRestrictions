const router = require('express').Router();
const { User } = require('../models/');
const withAuth = require('../utils/auth')
const cors = require('cors');






// Homepage route
router.get('/', (req, res) => {

  res.render('homepage', { loggedIn: req.session.loggedIn });
});

const corsOptions = {
  origin: '*',
  methods: ['GET','POST','OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'authorization-bearer', 'Authorization'],
  optionsSuccessfulStatue: 204,
  optionsSuccessStatus: 200
}

router.options('*', cors(corsOptions));
router.use(function(req,res, next){
  res.header("Access-Control-Allow-Headers", "Origin, authorization-bearer, Authorization");
});
// Saved-destination route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', { loggedIn: req.session.loggedIn, })
  }
  catch (err) {
    res.status(500).json(err)
  }
})


router.post('/create', async (req, res) => {
  try {
    const dbUser = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    res.json(dbUser)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

router.get('/get', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'description'],
        },
      ],
    })

    const userData = dbUserData.map((users) => {
      users.get({ plain: true })

    })
    return res.json(userData)
    console.log("shit")
  }
  catch (err) {
    res.status(500).json
  }
})

router.get('/get', async (req, res) => {
  try {
    const db = mysql.createConnection(
      {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'courses_db'
      },
      console.log(`Connected to the courses_db database.`)
    );
    db.query('SELECT * FROM course_names', function (err, results) {
      console.log(results);
    });

  }
  catch (err) {
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

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});






module.exports = router;