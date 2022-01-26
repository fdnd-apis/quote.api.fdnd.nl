const express = require('express')
const Quote = require('../models/quote.model')

module.exports = express
  .Router()

  // List ALL quotes
  .get('/', async (req, res, next) => {
    try {
      res.json(await Quote.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting tribes: ', err.message)
      next(err)
    }
  })
