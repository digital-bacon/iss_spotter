const {
  fetchMyIP,
} = require('./iss-promised');

fetchMyIP()
  .then(response => console.log(response));