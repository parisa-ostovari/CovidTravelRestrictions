const CLIENT_ID = `${environment.theClientID}`;
const CLIENT_SECRET = `${environment.theClientSecret}`;
// const country = require('./seeds')



//variables that will tie to handlebar sections
//const titleEl = document.querySelector('');
const entryEl = document.querySelector('.entryContainer');
const docEl = document.querySelector('.docContainer');
const maskEl = document.querySelector('.maskContainer');
const riskEl = document.querySelector('.riskContainer');
//const buttonEl = document.querySelector('.');
var previousCountries = [];

const formEl = document.querySelector('input[name="search"]');
const formValue = document.querySelector('#buttonSearch');

// this array will be used to check if the country code that the user puts in currently exists
const codeArray = ["US","CA","IT","EE","FR"];

checkForHistory();

//event listener for submit button on searchbar
formValue.addEventListener("click", function(clicked) {
  clicked.preventDefault();
  console.log(`button clicked`);
  let val = formEl.value.trim();
  console.log(val);
  val = val.toUpperCase();
  console.log(val);
  let isValidCode = checkIfValid(val);
  console.log(isValidCode);
  if (isValidCode){
    console.log(`code is valid, in if statement`)
    previousCountries.push(val);
    localStorage.setItem("searched Countries", JSON.stringify(previousCountries));  
    // call function to start the API call
    getToken(val);

  }
});


// function to check local storage for any previous searches 
function checkForHistory() {
  console.log(`Checking for past searches`);
  let pastHistory = localStorage.getItem("countryCodes");
    
  if(pastHistory) { 
    console.log(`Past searches were found`);
      let pastCountries = JSON.parse(pastHistory); 
      showHistory(pastCountries); 
  } 
}

// function to loop through local storage container
function showHistory(history) {
  console.log(`Showing history of past searches`);
  for (let i = 0; i <history.length; i++){
    let countries = history[i];
    createButton(countries);
  }
}

// function to create a button for every country code pulled from local storage
function createButton(countryCodes) {
  console.log(`creating buttons for past searches`);
  let newButton = document.createElement("button");
  newButton.className = "btn-info";
  newButton.textContent = countryCodes;
  //buttonEl.appendChild(newButton);

  newButton.addEventListener("click", function (){
    console.log(`adding the event listeners to the buttons from localStorage`);
    localStorage.setItem("countryCodes", JSON.stringify(previousCountries));
    //function call

    document.getElementById("tempHidden").classList.remove("visually-hidden");
  });
}

function checkIfValid(value){
  console.log(`Checking if input is valid`);
  if (!value){
    console.log(`input is null`);
    return false;
  };

  if(value.length != 2){
    // put warning here that the country code must be two letters long
    console.log(`Country code is not 2 characters long`);
    return false;
  };

  for (let i = 0; i < codeArray.length ; i++){
    if (value = codeArray[i]){
      console.log(`Country code matches`);
      return true;
    } else {
      console.log(`Country code did not match array`);
      return false;
    }
  };
}

  function getToken(apiCountry){
    console.log(`starting api call to get token`);
    //api body parameters
    var data = 
      `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
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


// retrieve country's COVID information
function retrieveCountry(token, searchCountry) {
  console.log(`token has been acquired, fetching COVID data`);
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

  //axios(config)
  fetch(`https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${searchCountry}`, {
    method: 'GET', 
    mode: 'cors', 
    catch: 'default', 
    headers: { 
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization-Bearer': 'G59rXFmdGmc8q0AF2FyN3j85kKVq', 
      'Authorization': 'Bearer '+ token
  }
  })
  .then((res)=>{
    return res.json()
  })
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

// set data to elements to show in dashboard-handlebars
function setDashboard(covidData) {
  console.log(`Filling in the Dashboard data`);
    let countryName = covidData.area.name;
    let entryData = covidData.areaAccessRestriction.entry;
    let docData = covidData.areaAccessRestriction.declarationDocuments;
    let maskData = covidData.areaAccessRestriction.mask;
    let diseaseRisk = covidData.diseaseRiskLevel;

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
    entryRestrictions.textContent = "Entry Restrictions";
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







// document
//   .querySelector('#search-form')
//   .addEventListener('submit', searchForm);
// Need to create a const for searchForm to call the event listener 

