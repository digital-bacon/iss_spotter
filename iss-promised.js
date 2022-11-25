const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');
// const fetchCoordsByIP = (ip) => ;

/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = (body) => {
  const parsedJSON = JSON.parse(body);
  const ip = parsedJSON.ip;
  return request('https://ipwho.is/' + ip);
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
}