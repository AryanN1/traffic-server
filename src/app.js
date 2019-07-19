require ('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
connection: process.env.DATABSE_URL
})

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.get('/incidents', (req, res) => {
  const incidents = knexInstance.from('incidents').select('*')
    .then(result => {
      res.send(result)
    })
})

app.get('/incidents-geo', (req, res) => {
  const incidents = knexInstance.from('incidents').select('*')
  .then(results => {
    let features = []
    for (let data of results) {
      let { location } = data
      location = location.slice(1, location.length - 2)
      let lon, lat = 0
      location = location.split(',')
      lat = parseFloat(location[0].trim())
      lon = parseFloat(location[1].trim())
      let temp = { lat: lat, lng: lon} 
      features.push(temp)
    }
    let geoJson = {    
      positions: features,
      options: {   
        radius: 20,   
        opacity: 0.6,

    }
  }
    res.send(geoJson)
  })
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})



module.exports = app

//#################################\\
// to push this to heroku use this:
  // "deploy": "git push heroku master"
// This ^^^ has to put into package.json
//##################################\\