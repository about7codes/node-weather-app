const request = require("request");

// const forecast = (lat, long, callback) => {
//   const url = `https://api.climacell.co/v3/weather/realtime?lat=${encodeURIComponent(
//     lat
//   )}&lon=${encodeURIComponent(
//     long
//   )}&unit_system=si&fields=temp&apikey=Z8E31R0Bx1Q1rxrBvBHaTETFQJriJr4T`;

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect Weather API", undefined);
//     } else if (response.body.message) {
//       callback("Unable to find yo location.", undefined);
//     } else {
//       const chall = `It is currently ${response.body.temp.value} degrees out.`;
//       callback(undefined, chall);
//     }
//   });
// };

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
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability,
      });
    }
  });
};

module.exports = forecast;
