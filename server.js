require("dotenv").config();

var app = require("express")();
var http = require("http").Server(app);
var request = require("request-promise");
var io = require("socket.io")(http);
var _ = require("lodash");

var cors = require("cors");

app.use(cors());

var VEHICLE_URL = "http://developer.trimet.org/ws/v2/vehicles";
var vehicles = [];

io.set("origins", "*:*");

function getVehicles() {
  request(VEHICLE_URL, {
    qs: {
      appID: process.env.TRIMET_KEY,
    },
  }).then(function(data) {
    var json = JSON.parse(data);
    if (json && json.resultSet) {
      vehicles = _.map(json.resultSet.vehicle, function(vehicle) {
        return _.pick(vehicle, [
          "routeNumber",
          "delay",
          "inCongestion",
          "latitude",
          "longitude",
          "type",
          "vehicleID",
        ]);
      });

      io.emit("vehicles_update", vehicles);
    }
  });
}

setInterval(getVehicles, 5000);

app.get("/", function(req, res) {
  res.send(vehicles);
});

io.on("connection", function(socket) {
  socket.emit("vehicles_update", vehicles);
});

http.listen(3001, function() {
  console.log("listening on 3001");
});
