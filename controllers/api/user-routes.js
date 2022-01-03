const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
  try {
    const newUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUserData.id;
      req.session.email = newUserData.email;
      req.session.loggedIn = true;

      res.status(200).json(newUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  // searching db for user with the inputted email
  try {
    const dbUserData = await User.findOne({
      where: { email: req.body.email },
    });
    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      return;
    }

    // comparing inputted password with hashed password
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.status(200).json({ dbUserData, message: 'You are now logged in.' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No account found.'});
  }
});


// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
