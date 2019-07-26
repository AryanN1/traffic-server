# Traffic Server

This is my server setup for The Traffic Data

## Technologies used
-React
-Knex
-Node
-PostgreSQL

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

-Database and server are both hosted on heroku
-Client is hosted on Zeit

## Endpoints
GET /incidents
  -Returns full array of incidents without geo-spatial data
GET /incidents-geo
  -Returns full array of incidents with geo-spatial data
