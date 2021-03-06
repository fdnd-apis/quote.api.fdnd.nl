require('dotenv').config()
const express = require('express')

const indexRoute = require('./routes/index')
const quoteRoute = require('./routes/quote')
const authorRoute = require('./routes/author')
const errorRoute = require('./routes/error')

module.exports = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .use('/', indexRoute)
  .use('/v1/quote', quoteRoute)
  .use('/v1/author', authorRoute)
  .use(errorRoute)
