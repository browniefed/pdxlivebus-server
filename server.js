require("dotenv").config();
const GROUPED_STOPS = require("./stops_grouped.json");
// Supply those via API/cache via JSON
// Emit bus at stop ID

const sorter = (a, b) => a.stop_sequence - b.stop_sequence;

const app = require("express")();
const http = require("http").Server(app);
const fetch = require("isomorphic-fetch");
const io = require("socket.io")(http);
const cors = require("cors");

const VEHICLE_URL = "http://developer.trimet.org/ws/v2/vehicles";
let vehicles = [];

const getRouteAndDirection = (route, direction) => {
  return GROUPED_STOPS[route]
    .filter(stop => {
      return stop.direction === direction + "";
    })
    .sort(sorter);
};

const getStopId = (stops, stopId) => {
  return stops.find(stop => {
    return stop === stopId + "";
  });
};

getRouteAndDirection(77, 0);

app.use(cors());
io.set("origins", "*:*");

async function getVehicles() {
  const data = await fetch(`${VEHICLE_URL}?appID=${process.env.TRIMET_KEY}`).then(res =>
    res.json(),
  );
  const json = JSON.parse(data);

  if (json && json.resultSet && json.resultSet.vehicle) {
    vehicles = json.resultSet.vehicle.map(
      ({
        routeNumber,
        delay,
        direction,
        inCongestion,
        loadPercentage,
        latitude,
        longitude,
        type,
        vehicleID,
        nextLocID,
        nextStopSeq,
        lastLocID,
        lastStopSeq,
        bearing,
      }) => {
        return {
          routeNumber,
          delay,
          direction,
          inCongestion,
          loadPercentage,
          bearing,
          latitude,
          longitude,
          type,
          vehicleID,
          nextLocID,
          nextStopSeq,
          lastLocID,
          lastStopSeq,
        };
      },
    );

    io.emit("vehicles_update", vehicles);
  }
}

app.get("/", function(req, res) {
  res.send(vehicles);
});

io.on("connection", function(socket) {
  socket.emit("vehicles_update", vehicles);
});

http.listen(3001, function() {
  console.log("listening on 3001");
});
