const axios = require('axios');
var qs = require('qs');

//variables that will tie to handlebar sections
//const titleEl = document.querySelector('');
const entryEl = document.querySelector('.entryContainer');
const docEl = document.querySelector('.docContainer');
const maskEl = document.querySelector('.maskContainer');
const riskEl = document.querySelector('.riskContainer');
//const buttonEl = document.querySelector('.');

const formInput = document.querySelector('input[name="search-form"]');


// function to check localstorage for any previous searches 
function checkForHistory() {
  let pastHistory = localStorage.getItem("countryCodes");
    
  if(pastHistory) { 
      let pastCountries = JSON.parse(pastHistory); 
      showHistory(pastCountries); 
  } 
  
}

// function to loop through local storage container
function showHistory(history) {
  for (let i = 0; i <history.length; i++){
    let countries = history[i];
    createButton(countries);
  }
}

// function to create a button for every country code pulled from local storage
function createButton(countryCodes) {
  let newButton = document.createElement("button");
  newButton.className = "btn-info";
  newButton.textContent = countryCodes;
  //buttonEl.appendChild(newButton);

  newButton.addEventListener("click", function (){
    localStorage.setItem("", JSON.stringify());
    //function call
    document.getElementById("tempHidden").classList.remove("visually-hidden");
  });
}


//calling API to recieve access token from Amadeus
function getToken(){
  //api body parameters
  var data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': CLIENT_ID,
  'client_secret': CLIENT_SECRET 
  });

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
      console.log(JSON.stringify(response.data));
  //console.log(response.data.access_token)
  let access_token = response.data.access_token;
  retrieveCountry(access_token);
  })
  .catch(function (error) {
    console.log(error);
  });

}


//retrieve country's COVID information
function retrieveCountry(token) {
    
  var data1 = qs.stringify({
  });
  
  var config = {
      method: 'get',
      url: `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${country}`,
      headers: { 
          'Authorization-Bearer': 'G59rXFmdGmc8q0AF2FyN3j85kKVq', 
          'Authorization': 'Bearer '+ token
      },
      data : data1
  };

  axios(config)
  .then(function (response) {
      let apiData = response.data;
      // console.log(JSON.stringify(response.data));
      // console.log(apiData);
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

// set data to elements to show in dashboard-handlebars
function setDashboard(covidData) {
    let countryName = covidData.data.area.name;
    let entryData = covidData.data.areaAccessRestriction.entry;
    let docData = covidData.data.areaAccessRestriction.declarationDocuments;
    let maskData = covidData.data.areaAccessRestriction.mask;
    let diseaseRisk = covidData.data.diseaseRiskLevel;

    // let title = document.createElement('h1');
    // title.textContent = countryName;
    // titleEl.append(title);

    let riskLvl = document.createElement('h3');
    riskLvl.textContent = "Disease Risk Level"
    let riskText = document.createElement('p');
    riskText.textContent = `${diseaseRisk}`;
    riskLvl.append(riskText);
    riskEl.append(riskLvl);

    let entryRestrictions = document.createElement('h3');
    entryRestrictions.textContent = "Entry Restrictions"
    let entryText = document.createElement('p');
    entryText.textContent = `Starting on ${entryData.date}.There is currently a ${entryData.ban} ban in place. ${entryData.text} You can find more information at: ${entryData.rules}`;
    entryRestrictions.append(entryText);
    entryEl.append(entryRestrictions);

    let maskRequirement = document.createElement('h3');
    maskRequirement.textContent = "Mask Requirement";
    let maskText = document.createElement('p');
    maskText.textContent = `Starting on ${maskData.date}, there is a ${maskData.isRequired} requirement to wear a mask. ${maskData.text}`;
    maskRequirement.append(maskText);
    maskEl.append(maskRequirement);

    let docRequirement = document.createElement('h3');
    docRequirement.textContent = "Documents";
    let docText = document.createElement('p');
    docText.textContent = `Starting on ${docData.date}, ${docData.text}`;
    docRequirement.append(docText);
    docEl.append(docRequirement);
}




document
  .querySelector('#search-form')
  .addEventListener('submit', searchForm);
// Need to create a const for searchForm to call the event listener 