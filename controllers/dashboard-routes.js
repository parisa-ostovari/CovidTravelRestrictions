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

// const axios = require('axios');
// const { Router } = require('express');

// const router= Router;

// router.get('/', (req,res) => {

// })

//   function getToken(apiCountry){
//     console.log(`starting api call to get token`);
//     //api body parameters
//     var data = 
//       `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
//     ;
  
//     //Setting up method, url, headers for api Oauth2.0 request
//     var config = {
//       method: 'post',
//       url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
//       headers: { 
//       'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       data : data
//     };
  
//     axios(config)
//       .then(function (response) {
//         console.log(`----____--_-__-----___--`);
//         console.log(JSON.stringify(response.data));
//         //console.log(response.data.access_token)
//         let access_token = response.data.access_token;
//         retrieveCountry(access_token, apiCountry);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }



// //retrieve country's COVID information
// function retrieveCountry(token, searchCountry) {
//   console.log(`token has been aquired, fetching COVID data`);
//   console.log(token);
//   var data1 = ``;
  
//   var config = {
//       method: 'get',
//       url: `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${searchCountry}`,
//       headers: { 
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization-Bearer': 'G59rXFmdGmc8q0AF2FyN3j85kKVq', 
//           'Authorization': 'Bearer '+ token
//       },
//       data : data1
//   };

//   axios(config)
//   .then(function (response) {
//       let apiData = response.data;
//       // console.log(JSON.stringify(response.data));
//       console.log(apiData);
//       //console.log(apiData.data.area.name);
//       //console.log(apiData.data.diseaseRiskLevel);
//       //console.log(apiData.data.areaAccessRestriction.declarationDocuments);
//       //console.log(apiData.data.areaAccessRestriction.entry.text);
//       //console.log(apiData.data.areaAccessRestriction.mask);
//       setDashboard(apiData);
//   })
//   .catch(function (error) {
//       console.log(error);
//   });
// }

// // document
// //   .querySelector('#search-form')
// //   .addEventListener('submit', searchForm);
// // Need to create a const for searchForm to call the event listener 