const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');
// const fetchCoordsByIP = (ip) => ;

/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = body => {
  const parsedJSON = JSON.parse(body);
  const ip = parsedJSON.ip;
  return request('https://ipwho.is/' + ip);
};

const fetchISSFlyOverTimes = body => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(riseTimes => {
      const { response } = JSON.parse(riseTimes);
      return response;
    });
};

module.exports = {
  nextISSTimesForMyLocation
};