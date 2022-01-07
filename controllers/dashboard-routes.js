const router = require('express').Router();
const { Country } = require('../models');
const withAuth = require('../utils/auth');


router.get('/dashboard/:id', async (req, res) => {
  try {
    const dbcountryData = await Country.findByPk(req.params.id, {
      include: [
        {
          model: Country,
          attributes: ['countryName', 
          'countryCode', 
          'diseaseRisk', 
          'entryText', 
          'entryDate', 
          'docText', 
          'docDate', 
          'isDocReq', 
          'countryDocLink', 
          'maskText', 
          'maskDate'
        ],
        },
      ],
    });
  
      const country = dbcountryData.get({ plain: true });
      res.render('country', {
        country})
      // return res.json(countryData)
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});