const { nextISSTimesForMyLocation } = require('./iss-promised');

const printReturnedFlyoverTimes = dataRiseTimes => {
  for (const dataSet of dataRiseTimes) {
    const riseTime = dataSet.risetime;
    const dateAsGMT = timestampECMAEpochToDate(riseTime);
    const duration = dataSet.duration;
    printFlyoverTime(dateAsGMT, duration);
  }
};

const printFlyoverTime = (dateAsGMT, durationInSeconds) => {
  console.log(`Next pass at ${dateAsGMT} for ${durationInSeconds} seconds!`);
};

const timestampECMAEpochToDate = (ECMAEpochTimestamp) => {
  return Date(ECMAEpochTimestamp);
};

nextISSTimesForMyLocation()
  .then(riseTimes => printReturnedFlyoverTimes(riseTimes));