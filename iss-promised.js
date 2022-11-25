const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

module.exports = {
  fetchMyIP,
}