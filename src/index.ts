import request from 'request-promise-native'

export async function getDrones (): Promise<Drone[]> {
  request({
    uri: 'https://jsonplaceholder.typicode.com/todos/1',
    json: true
  });
  return null as any;
}

export async function getDrone (id: DroneId): Promise<Drone> {
  return null as any;
}
