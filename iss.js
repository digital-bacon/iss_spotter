const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const statusCode = response.statusCode;
    // if non-200 status, assume server error
    if (statusCode !== 200) {
      const msg = `Status Code ${statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    return;
  });
};


/**
 * Makes a single API request to retrieve the user's longitude and longitude.
 * Input:
 *   - A callback (to pass back an error or the coordinates as an object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The coordinates (null if error). Example: { latitude: 37.3860517, longitude: -122.0838511 }
 */
const fetchCoordsByIP = (ip, callback) => {
  const url = 'https://ipwho.is/' + ip;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const parsedJSON = JSON.parse(body);
    const success = parsedJSON.success;
    const messageFromAPI = parsedJSON.message;
    const longitude = parsedJSON.longitude;
    const latitude = parsedJSON.latitude;
    // if API reported no success, assume the API could not find the coordinates
    if (success === false) {
      const msg = `Unable to retrieve coordinates for IP ${ip}. ${messageFromAPI}`;
      callback(Error(msg), null);
      return;
    }
    const data = { longitude, latitude };
    callback(null, data);
    return;
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coordinates, callback) => {
  // const longitude = coordinates.longitude;
  const longitude = 1234;
  const latitude = coordinates.latitude;
  const url = `https://iss-fly2over.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const statusCode = response.statusCode;
    if (statusCode === 400) {
      const msg = `The provided coordinates were invalid (${longitude}, ${latitude}.`;
      callback(Error(msg), null);
      return;
    }
    // if non-200 status, assume server error
    if (statusCode !== 200) {
      const msg = `Status Code ${statusCode} when fetching data.`;
      callback(Error(msg), null);
      return;
    }
    const parsedJSON = JSON.parse(body);
    const riseTimes = parsedJSON.response;
    callback(null, riseTimes);
    return;
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };