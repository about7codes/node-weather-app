const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/" +
    latitude +
    "," +
    longitude +
    "?units=si";
    
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect forecast services!", undefined);
    } else if (body.error) {
      callback("Unable to find the location.", undefined);
    } else {
      const phrase = `${body.daily.data[0].summary} It is currently ${body.currently.temperature}
                      degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of 
                      ${body.daily.data[0].temperatureLow} . There is a ${body.currently.precipProbability}% 
                      chance of rain.`;

      callback(undefined, phrase)
    }
  });
};

module.exports = forecast;
