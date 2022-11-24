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
  // use request to fetch IP address from JSON API
  // endpoint https://api.ipify.org?format=json
  // return data as {"ip":"75.156.142.74"}
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

const fetchCoordsByIP = (ip, callback) => {
  // endpoint: http://ipwho.is/8.8.4.4
  // JSON output:
  /*
  {"ip":"8.8.4.4","success":true,"type":"IPv4","continent":"North America","continent_code":"NA","country":"United States","country_code":"US","region":"California","region_code":"CA","city":"Mountain View","latitude":37.3860517,"longitude":-122.0838511,"is_eu":false,"postal":"94039","calling_code":"1","capital":"Washington D.C.","borders":"CA,MX","flag":{"img":"https:\/\/cdn.ipwhois.io\/flags\/us.svg","emoji":"\ud83c\uddfa\ud83c\uddf8","emoji_unicode":"U+1F1FA U+1F1F8"},"connection":{"asn":15169,"org":"Google LLC","isp":"Google LLC","domain":"google.com"},"timezone":{"id":"America\/Los_Angeles","abbr":"PST","is_dst":false,"offset":-28800,"utc":"-08:00","current_time":"2022-11-24T15:32:32-08:00"}}
  */
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