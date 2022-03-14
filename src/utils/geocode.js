const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFuaml0aHJhZmZpcSIsImEiOiJjbDBrbGJkNGYwM2VhM2JxZDRyZXVjc2UxIn0.LfI2WCVgB-15KwfFQvu8yw";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Check your Conectivity", undefined);
    } else if (body.features.length === 0) {
      callback("There is no location found. Try another search", undefined);
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
