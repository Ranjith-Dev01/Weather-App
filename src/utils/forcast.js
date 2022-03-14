const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=43898318449a75eba3f3d892bf21ac9f&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Check your conectivity", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const temp = body.current.temperature;
      const feel = body.current.feelslike;
      const weather_Description = body.current.weather_descriptions;
      callback(
        undefined,
        weather_Description +
          ". Its is currentely " +
          temp +
          " degree out. It feels like " +
          feel +
          " degree out."
      );
    }
  });
};

module.exports = forecast;
