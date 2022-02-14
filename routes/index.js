const express = require('express')

module.exports = express
  .Router()

  .get('/', (req, res) => {
    res.json({
      message: 'Welcome to tribe.api.fdnd.nl! This is a work in progress... please be patient.',
      github: 'https://github.com/fdnd-apis/quote',
      spec: 'https://quote.api.fdnd.nl/v1',
      docs: 'https://redocly.github.io/redoc/?url=https:%2F%2Fquote.api.fdnd.nl%2Fv1',
    })
  })
