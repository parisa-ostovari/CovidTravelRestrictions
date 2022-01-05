const express = require('express');
const router = require('./api/user-routes');
const axios = require('axios');


// router.post('/', async (req, res, next) =>{
    
//     console.log(`starting api call to get token`);
//     //api body parameters
//     var data = 
//       `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
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
// })

// router.get('/', (req,res, next)=> {
//     res.status(200).json({
//         message: 'get request made'
//     });
// });

// const CLIENT_ID = `${environment.theClientID}`;
// const CLIENT_SECRET = `${environment.theClientSecret}`;

//variables that will tie to handlebar sections
//const titleEl = document.querySelector('');

//calling API to recieve access token from Amadeus
// const callingAPI1 = async function(event){
//   event.preventDefault();
//   console.log(`event made`);
  // var body1 = 
  //     `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  //   ;
  
  // const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
  //   method: 'POST',
  //   body: body1,
  //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  // })
  // const data = await response.json;



  function getToken(apiCountry){
    console.log(`starting api call to get token`);
    //api body parameters
    var data = 
      `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    ;
  
    //Setting up method, url, headers for api Oauth2.0 request
    var config = {
      method: 'post',
      url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
      headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
  
    axios(config)
      .then(function (response) {
        console.log(`----____--_-__-----___--`);
        console.log(JSON.stringify(response.data));
        //console.log(response.data.access_token)
        let access_token = response.data.access_token;
        retrieveCountry(access_token, apiCountry);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
// }


//retrieve country's COVID information
function retrieveCountry(token, searchCountry) {
  console.log(`token has been aquired, fetching COVID data`);
  console.log(token);
  var data1 = ``;
  
  var config = {
      method: 'get',
      url: `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${searchCountry}`,
      headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization-Bearer': 'G59rXFmdGmc8q0AF2FyN3j85kKVq', 
          'Authorization': 'Bearer '+ token
      },
      data : data1
  };

  axios(config)
  .then(function (response) {
      let apiData = response.data;
      // console.log(JSON.stringify(response.data));
      console.log(apiData);
      //console.log(apiData.data.area.name);
      //console.log(apiData.data.diseaseRiskLevel);
      //console.log(apiData.data.areaAccessRestriction.declarationDocuments);
      //console.log(apiData.data.areaAccessRestriction.entry.text);
      //console.log(apiData.data.areaAccessRestriction.mask);
      setDashboard(apiData);
  })
  .catch(function (error) {
      console.log(error);
  });
}

// // set data to elements to show in dashboard-handlebars
// function setDashboard(covidData) {
//   console.log(`Filling in the Dashboard data`);
//     let countryName = covidData.data.area.name;
//     let entryData = covidData.data.areaAccessRestriction.entry;
//     let docData = covidData.data.areaAccessRestriction.declarationDocuments;
//     let maskData = covidData.data.areaAccessRestriction.mask;
//     let diseaseRisk = covidData.data.diseaseRiskLevel;

//     // let title = document.createElement('h1');
//     // title.textContent = countryName;
//     // titleEl.append(title);

//     let riskLvl = document.createElement('h3');
//     riskLvl.textContent = "Disease Risk Level"
//     let riskText = document.createElement('p');
//     riskText.textContent = `${diseaseRisk}`;
//     riskLvl.append(riskText);
//     riskEl.append(riskLvl);

//     let entryRestrictions = document.createElement('h3');
//     entryRestrictions.textContent = "Entry Restrictions"
//     let entryText = document.createElement('p');
//     entryText.textContent = `Starting on ${entryData.date}.There is currently a ${entryData.ban} ban in place. ${entryData.text} You can find more information at: ${entryData.rules}`;
//     entryRestrictions.append(entryText);
//     entryEl.append(entryRestrictions);

//     let maskRequirement = document.createElement('h3');
//     maskRequirement.textContent = "Mask Requirement";
//     let maskText = document.createElement('p');
//     maskText.textContent = `Starting on ${maskData.date}, there is a ${maskData.isRequired} requirement to wear a mask. ${maskData.text}`;
//     maskRequirement.append(maskText);
//     maskEl.append(maskRequirement);

//     let docRequirement = document.createElement('h3');
//     docRequirement.textContent = "Documents";
//     let docText = document.createElement('p');
//     docText.textContent = `Starting on ${docData.date}, ${docData.text}`;
//     docRequirement.append(docText);
//     docEl.append(docRequirement);
// }


// document
//   .querySelector('#search-form')
//   .addEventListener('submit', searchForm);
// Need to create a const for searchForm to call the event listener 

