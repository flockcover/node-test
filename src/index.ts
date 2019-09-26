import { getDrone, getDrones } from "./drones";

const [cmd, arg] = process.argv.slice(2);

if (cmd === 'get-drones') {
  getDrones()
    .then(result => console.log(result))
    .catch(err => console.error(err));
}

if (cmd === 'get-drone') {
  getDrone(parseInt(arg, 10))
    .then(result => console.log(result))
    .catch(err => console.error(err));
}
