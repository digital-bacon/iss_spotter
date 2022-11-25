const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
} = require('./iss-promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(response => console.log(response));