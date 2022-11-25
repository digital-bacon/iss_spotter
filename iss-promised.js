const request = require('request-promise-native');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Returns: Promise of request for IP address
 */
const fetchMyIP = () => request('https://api.ipify.org?format=json');

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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input JSON string containing latitude and longitude coordinates
 * Returns: Promise of request for ISS fly over times (rise Times)t
 */
const fetchISSFlyOverTimes = body => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

/*
 * Input: None
 * Returns: Promise for ISS fly over data for users location
 */
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