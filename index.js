require("dotenv").config();
require("./migrate");

const db = require("./db");
const app = require("express")();
const bodyParser = require("body-parser");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const _ = require("lodash");
const fetch = require("isomorphic-fetch");

const { pluckVehicleFields, sorter, getRouteAndDirection, getStopId } = require("./utils");
const GROUPED_STOPS = require("./stops_grouped.json");
const VEHICLE_URL = "http://developer.trimet.org/ws/v2/vehicles";

let vehicles = [];

async function getVehicles() {
  const res = await fetch(`${VEHICLE_URL}?appID=${process.env.TRIMET_KEY}`);
  const data = await res.json();
  const results = _.get(data, "resultSet.vehicle");

  if (results) {
    vehicles = _.map(results, vehicle => pluckVehicleFields(vehicle));
    io.emit("vehicles_update", vehicles);
  }
}

setInterval(() => getVehicles(), 5000);

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());
io.set("origins", "*:*");

app.get("/", (req, res) => res.send(vehicles));
app.get("/reports/stats", (req, res) => {});
app.get("/reports", async (req, res) => {
  const data = await db
    .select("*")
    .from("reports")
    .limit(10);

  res.send(data);
});

app.post("/reports", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const insertedReport = await db
    .insert({
      type: req.body.type,
      description: req.body.description,
      coordinates: req.body.coordinates,
      route_number: req.body.route_number,
      vehicle_number: req.body.vehicle_number,
      stop_id: req.body.stop_id,
      name: req.body.name,
      phone: req.body.phone,
    })
    .into("reports")
    .return({ inserted: true });

  // broadcast report
});

io.on("connection", function(socket) {
  socket.emit("vehicles_update", vehicles);
});

server.listen(3001);

console.log("listening on 3001");
