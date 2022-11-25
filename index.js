const {
  nextISSTimesForMyLocation
} = require('./iss');

const printNextFlyoverTime = (dateAsGMT, durationInSeconds) => {
  console.log(`Next pass at ${dateAsGMT} for ${durationInSeconds} seconds!`);
};

const timestampECMAEpochToDate = (ECMAEpochTimestamp) => {
  return Date(ECMAEpochTimestamp);
};

nextISSTimesForMyLocation((error, dataRiseTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  for (const dataSet of dataRiseTimes) {
    const riseTime = dataSet.risetime;
    const dateAsGMT = timestampECMAEpochToDate(riseTime);
    const duration = dataSet.duration;
    printNextFlyoverTime(dateAsGMT, duration);
  }
});
