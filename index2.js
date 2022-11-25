const {
  fetchMyIP,
  fetchCoordsByIP,
} = require('./iss-promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(response => console.log(response));