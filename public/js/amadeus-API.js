const router = require('express').Router();
const path = require('path');
const axios = require('axios');
var qs = require('qs');

//data goes to 
var data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': 'D98xiSbhvHJl5oqdS0MKHsVB5GFmKCHJ',
  'client_secret': 'GHpH5yEpRKqWuuoR' 
});


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
})
.catch(function (error) {
  console.log(error);
});


var axios = require('axios');
var qs = require('qs');
var data1 = qs.stringify({
   
});
var config = {
  method: 'get',
  url: 'https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=FR',
  headers: { 
    'Authorization-Bearer': 'G59rXFmdGmc8q0AF2FyN3j85kKVq', 
    'Authorization': 'Bearer rVoPn7rRfSx5K9yoIepWzywlpKHk'
  },
  data : data1
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

module.exports = router;