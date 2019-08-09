import nock from 'nock'

import {getDrone, getDrones} from '../src/drones';

const endpoint = 'https://bobs-epic-drone-shack-inc.herokuapp.com';
const drone: Drone = {
  droneId: 1,
  numFlights: 123,
  name: "Retro Encabulator",
  currency: "USD",
  price: 100000,
  numCrashes: 123
};
const drones: Drone[] = [drone, drone, drone];

describe('getDrone function', () => {
  const route = '/api/v0/drone/1';

  beforeEach(()=> {
    nock.cleanAll();
  });

  it('calls the endpoint', async () => {
    // API returns one drone
    const scope = nock(endpoint).get(route).reply(200, drone);

    await getDrone(1);
    expect(scope.isDone()).toBeTruthy();
  });

  it('returns the response', async () => {
    // API returns one drone
    nock(endpoint).get(route).reply(200, drone);

    const result = await getDrone(1);
    expect(result).toEqual(drone);
  });

  it('retries a maximum of five times', async () => {
    let calls = 0;

    // API returns an infinite number of errors
    nock(endpoint).get(route).reply(() => {
      calls++;
      return [500]
    }).persist();

    try {
      await getDrone(1);
    } catch (e) {}

    expect(calls).toBe(5);
  });

  it('retries until it gets a response', async () => {
    let calls = 0;
    let response;

    // API returns two errors, then an infinite number of drone responses
    nock(endpoint).get(route).reply(() => {
      calls++;
      if (calls < 3) {
        return [500];
      } else {
        return [200, drone];
      }
    }).persist();

    try {
      response = await getDrone(1);
    } catch (e) {}

    expect(response).toEqual(drone);
    expect(calls).toBe(3);
  });

  it('if it cannot get a response, tries to use cached result', async () => {
    // Fill the cache
    nock(endpoint).get(route).reply(200, drone).persist(false);
    await getDrone(1);

    // Create failing endpoint
    nock(endpoint).get(route).reply(() => [500]).persist();
    const response = await getDrone(1);

    expect(response).toEqual(drone);
  });

  it('if it cannot get a response or a cache result, throws an exception', async () => {
    let error: Error;

    // API returns infinite number of errors
    nock(endpoint).get(route).reply(() => [500]).persist();

    try {
      await getDrone(1);
    } catch (e) {
      error = e;
    }

    expect(error).toBeTruthy();
    expect(error.message).toEqual('Upstream API error');
  });
});

describe('getDrones function', () => {
  const route = '/api/v0/drones';

  beforeEach(()=> {
    nock.cleanAll();
  });

  it('calls the endpoint', async () => {
    // API returns one drone list
    const scope = nock(endpoint).get(route).reply(200, drones);

    await getDrones();
    expect(scope.isDone()).toBeTruthy();
  });

  it('returns the response', async () => {
    // API returns one drone list
    nock(endpoint).get(route).reply(200, drones);

    const result = await getDrones();
    expect(result).toEqual(drones);
  });

  it('retries a maximum of five times', async () => {
    let calls = 0;

    // API returns infinite number of errors
    nock(endpoint).get(route).reply(() => {
      calls++;
      return [500]
    }).persist();

    try {
      await getDrones();
    } catch (e) {}

    expect(calls).toBe(5);
  });

  it('retries until it gets a response', async () => {
    let calls = 0;
    let response;

    // API returns two errors, then infinite number of drone lists
    nock(endpoint).get(route).reply(() => {
      calls++;
      if (calls < 3) {
        return [500];
      } else {
        return [200, drones];
      }
    }).persist();

    try {
      response = await getDrones();
    } catch (e) {}

    expect(response).toEqual(drones);
    expect(calls).toBe(3);
  });

  it('if it cannot get a response, tries to use cached result', async () => {
    // Fill the cache
    nock(endpoint).get(route).reply(200, drones);
    await getDrone(1);

    // Create failing endpoint
    nock(endpoint).get(route).reply(() => [500]).persist();
    const response = await getDrones();

    expect(response).toEqual(drones);
  });

  it('if it cannot get a response or a cache result, throws an exception', async () => {
    let error: Error;

    // API returns infinite number of errors
    nock(endpoint).get(route).reply(() => [500]).persist();

    try {
      await getDrones();
    } catch (e) {
      error = e;
    }

    expect(error).toBeTruthy();
    expect(error.message).toEqual('Upstream API error');
  });
});
