require ('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    database: 'traffic',
  }
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