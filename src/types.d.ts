interface Drone {
  droneId:    DroneId,
  numFlights: number,
  name:       string,
  currency:   string,
  price:      number,
  numCrashes: number
}

type DroneId = number;
