const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forcast");

const app = express();

const port = process.env.PORT || 4000;

//Define paths for express config
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Define setup for handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(staticPath));

app.get("", (req, res) => {
  res.render("index", {
    title: " Weather APP",
    name: "Ranjith kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Among Us",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message:
      "Consectetur non anim qui irure do eiusmod ex nostrud. Laborum voluptate aute ea dolor sint minim qui in ipsum amet dolore voluptate. Fugiat consectetur excepteur culpa culpa commodo pariatur eiusmod duis tempor adipisicing adipisicing.",
    name: "Ranjith kumar",
  });
});

// Weather page

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastata) => {
        if (error) {
          return res, send({ error });
        }

        res.send({
          forecast: forecastata,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   forcast: "It is rainy today",
  //   location: "Chennai",
  //   address: req.query.address,
  // });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send("You must provide the search tearm");
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ranjith kumar",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ranjith kumar",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("server is up and running on" + port);
});
