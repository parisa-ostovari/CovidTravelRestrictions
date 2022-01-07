const CLIENT_ID = `${environment.theClientID}`;
const CLIENT_SECRET = `${environment.theClientSecret}`;

//variables that will tie to handlebar sections
const titleEl = document.querySelector('.countryName');
const entryEl = document.querySelector('.entryContainer');
const docEl = document.querySelector('.docContainer');
const maskEl = document.querySelector('.maskContainer');
const riskEl = document.querySelector('.riskContainer');
//const buttonEl = document.querySelector('.');
var previousCountries = [];

const formEl = document.querySelector('input[name="search"]');
const formValue = document.querySelector('#buttonSearch');

// this array will be used to check if the country code that the user puts in currently exists
const codeArray = ["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT",
"BO","BQ","BA","BW","BV","BR","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR",
"CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL",
"GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI",
"KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC",
"MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL",
"PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS",
"SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM",
"UY","UZ","VU","VE","VN","VG","VI","WF","EH","YE","ZM","ZW"];

checkForHistory();

//event listener for submit button on searchbar
formValue.addEventListener("click", function(clicked) {
  clicked.preventDefault();

  let val = formEl.value.trim();
  val = val.toUpperCase();

  let isValidCode = checkIfValid(val);

  if (isValidCode){

    previousCountries.push(val);
    localStorage.setItem("searched Countries", JSON.stringify(previousCountries));  
    // call function to start the API call
    getToken(val);
  }
});


// function to check local storage for any previous searches 
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
  buttonEl.appendChild(newButton);

  newButton.addEventListener("click", function (){

    console.log(`adding the event listeners to the buttons from localStorage`);
    localStorage.setItem("countryCodes", JSON.stringify(previousCountries));
    //function call

    document.getElementById("tempHidden").classList.remove("visually-hidden");
  });
}

function checkIfValid(value){
  
  var isValid = false;

  if (!value){
    console.log(`input is null`);
    return false;
  };

  if(value.length != 2){
    // put warning here that the country code must be two letters long
    console.log(`Country code is not 2 characters long`);
    return false;
  };

  isValid = codeArray.includes(value);
  return isValid;
}

function getToken(apiCountry){
    
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


  fetch(`https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${searchCountry}`, {
    method: 'GET', 
    mode: 'cors', 
    catch: 'default', 
    headers: {  
      'Authorization': 'Bearer '+ token
    }
  })
  .then((res)=> {
    return res.json()
  })
  .then(function (response) {
      let apiData = response.data;
      setDashboard(apiData);
  })
  .catch(function (error) {
      console.log(error);
  });
}

// set data to elements to show in dashboard-handlebars
function setDashboard(covidData) {

    let countryName = covidData.area.name;

    let entryData = covidData.areaAccessRestriction.entry;
    let entryParagraph = entryData.text;
    entryParagraph = entryParagraph.replace( /(<([^>]+)>)/ig, '');
    console.log(entryParagraph);

    let docData = covidData.areaAccessRestriction.declarationDocuments;
    let docParagraph = docData.text;
    docParagraph = entryParagraph.replace( /(<([^>]+)>)/ig, '');
    console.log(docParagraph);

    let maskData = covidData.areaAccessRestriction.mask;
    let maskParagraph = maskData.text;
    maskParagraph = entryParagraph.replace( /(<([^>]+)>)/ig, '');
    console.log(maskParagraph);
    let diseaseRisk = covidData.diseaseRiskLevel;


    let title = document.createElement('h1');
     title.textContent = countryName;
     titleEl.append(title);

    let riskLvl = document.createElement('h5');
    riskLvl.textContent = "Disease Risk Level";
    riskLvl.className = "card-title";
    console.log(riskLvl);

    let riskText = document.createElement('p');
    riskText.textContent = `${diseaseRisk}`;
    riskText.className = "card-text";

    console.log(riskText);

    riskEl.append(riskLvl);
    riskEl.append(riskText);

    let entryRestrictions = document.createElement('h5');
    entryRestrictions.textContent = "Entry Restrictions";
    entryRestrictions.className = "card-title";
    console.log(entryRestrictions);

    let entryText = document.createElement('p');
    entryText.textContent = `Starting on ${entryData.date}. There is currently a ${entryData.ban} ban in place. ${entryParagraph}`;
    entryText.className = "card-text";
    let entryLink = document.createElement('a');
    entryLink.textContent = `You can find more information here`;
    entryLink.setAttribute("target", "_blank");
    entryLink.setAttribute("href", `${entryData.rules}`)

    entryEl.append(entryRestrictions);
    entryEl.append(entryText);
    entryEl.append(entryLink);

    let maskRequirement = document.createElement('h5');
    maskRequirement.textContent = "Mask Requirement";
    maskRequirement.className = "card-title";
    console.log(maskRequirement);

    let maskReq = document.createElement('p');
    maskReq.textContent = `Effective on ${maskData.date}. \n Mask requirement: ${maskData.isRequired}.`;
    maskReq.className = "card-text";

    let maskText = document.createElement('p');
    maskText.textContent = `${maskParagraph}`;
    maskText.className = "card-text";
  
    maskEl.append(maskRequirement);
    maskEl.append(maskReq);
    maskEl.append(maskText);

    let docRequirement = document.createElement('h5');
    docRequirement.textContent = "Documents";
    docRequirement.className = "card-title";

    let docText = document.createElement('p');
    docText.textContent = `Starting on ${docData.date}, ${docParagraph}`;
    docText.className = "card-text";

    docEl.append(docRequirement);
    docEl.append(docText);
}