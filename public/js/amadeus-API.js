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