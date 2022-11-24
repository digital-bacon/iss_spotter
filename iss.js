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
    console.log(body);
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

module.exports = { fetchMyIP, fetchCoordsByIP };