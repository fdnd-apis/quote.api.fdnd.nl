const express = require('express')
const openapi = require('../docs/openapi.json')

module.exports = express
  .Router()

  // Bid welcome and send all infos on this API
  .get('/', (req, res) => {
    res.json({
      message: 'Welcome to tribe.api.fdnd.nl! This is a work in progress... please be patient.',
      github: 'https://github.com/fdnd-apis/quote',
      spec: 'https://quote.api.fdnd.nl/v1',
      docs: 'https://redocly.github.io/redoc/?url=https:%2F%2Fquote.api.fdnd.nl%2Fv1',
    })
  })

  // Send openapi doc as json
  .get('/v1', (req, res) => {
    res.json(openapi)
  })
