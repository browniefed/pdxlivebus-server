const pluckVehicleFields = ({
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
};

const sorter = (a, b) => a.stop_sequence - b.stop_sequence;

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


module.exports = {
  pluckVehicleFields,
  sorter,
  getRouteAndDirection,
  getStopId,
}