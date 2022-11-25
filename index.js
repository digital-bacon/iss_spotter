const {
  nextISSTimesForMyLocation
} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }

//     fetchISSFlyOverTimes(coordinates, (error, riseTimes) => {
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
    
//     });
//   });
// });

// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
// Next pass at Fri Jun 01 2021 14:36:08 GMT-0700 (Pacific Daylight Time) for 632 seconds!
// Next pass at Fri Jun 01 2021 16:12:35 GMT-0700 (Pacific Daylight Time) for 648 seconds!
// Next pass at Fri Jun 01 2021 17:49:29 GMT-0700 (Pacific Daylight Time) for 648 seconds!
// Next pass at Fri Jun 01 2021 19:26:12 GMT-0700 (Pacific Daylight Time) for 643 seconds!

const printNextFlyoverTime = (dateAsGMT, timeZone, durationInSeconds) => {
  console.log(`Next pass at ${dateAsGMT} (${timeZone}) for ${durationInSeconds} seconds!`)
}

const unixTimestampToDate = (unixTimestamp) => Date.parse(timeStamp);



nextISSTimesForMyLocation((error, riseTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  const arrayRiseTimes = riseTimes;
  console.log(arrayRiseTimes);
});
