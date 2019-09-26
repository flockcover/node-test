# Node Test

Bob's Epic Drone Shack Inc. manufactures drones. They have made an API available at `https://bobs-epic-drone-shack-inc.herokuapp.com`
listing all of their products and providing safety information about them. The API is poorly documented, and fails
frequently with a variety of status errors.

The documentation lists the following routes:

```
GET -> /api/v0/drones
GET -> /api/v0/drone/:id
```

No other documentation is provided.

Part One
--------

Your job is to build two functions, `getDrone` and `getDrones`, which will try to

1. get data from the endpoints above;
2. if that fails, retry a maximum of five times;
3. if that fails, fetch data from a cache;
4. if that fails, throw a custom error

A colleague of yours made a start on the work, but was only able to write some unit tests. You can run them with `yarn test`.

You can run the `getDrones` command directly with `yarn get-drones` and `yarn get-drone`.

When all the tests succeed, you should have completed the task.

Part Two (option 1)
-------------------

Expose your `getDrone` and `getDrones` as routes in a HTTP server (either REST or GraphQL). We suggest
[ExpressJS](https://expressjs.com/).

Part Two (option 2)
-------------------

Use the `getDrones` function you've written in a command line app that can output a list of drones in one of three formats:

- CSV
- XML
- "Pretty printed" ASCII tables
