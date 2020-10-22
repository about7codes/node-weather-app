const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmVjaXZpajY5MyIsImEiOiJja2Z2ZGVlOGcxNTllMnNzdnRkamx1aGQ5In0.1KSbuonoi695UI9551l2xg&limit=1`;

  request({ url: url, json: true }, (err, {body}) => {
    if (err) {
      callback("Unable to connect to location API", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find any location. Try Again.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
