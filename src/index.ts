import { getDrones } from "./drones";

console.log('Getting drones...');
getDrones()
  .then(drones => console.log(drones))
  .then(() => console.log('Done!'))
  .catch(err => console.error('Something went wrong: ' + err.message));
