console.log("Hi!! this is js file");

// const locationData = fetch(
//   "http://localhost:4000/weather?address=chennai"
// ).then((res) => {
//   res.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherElement = document.querySelector("form");
const searchLocation = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchLocation.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("http://localhost:4000/weather?address=" + location + "").then(
    (res) => {
      res.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
