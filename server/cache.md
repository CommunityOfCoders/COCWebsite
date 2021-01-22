# Cache

Since we have a lot of end points, we decided that it is better we introduce some sort of cache mechanisms in our systems. This will help us in responding to queries faster, and a smoother UI.

## What we decided to cache

This is a curated list of points where we decided to cache our results

1. `/api/blogs`
2. `/aoi/blogs/:id`

## Stuff required for cache

1. The npm module `redis`. Details [here](https://www.npmjs.com/package/redis).
2. The Heroku add on: `heroku-redis`.

## How to cache

Ideally, we would want everything... fast. We use a middleware that helps us in setting key-values in our Redis store. The decision for what route to have that middleware is wholly and solely on the basis of what we want and the frequency with which we want.

GET requests can be easily cached and attended to, but we need to take care of whenever we perform a write operation.

Ideally the flow should be:

| Method | Route      | Decision                                                                |
| ------ | ---------- | ----------------------------------------------------------------------- |
| GET    | `/api/all` | Choose wisely                                                           |
| GET    | `/api/one` | If in cache, return from store. Else return from DB and store in cache. |
| PUT    | `/api/one` | Update cache.                                                           |
| DELETE | `/api/one` | Remove from cache.                                                      |
