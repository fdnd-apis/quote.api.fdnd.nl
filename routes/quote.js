const express = require('express')
const Quote = require('../models/quote.model')

module.exports = express
  .Router()

  // Add a new quote
  .post('/', async (req, res, next) => {
    try {
      res.json(await Quote.create(new Quote(req.body)))
    } catch (err) {
      console.error('Error while adding quote: ', err.message)
      next(err)
    }
  })

  // List ALL quotes
  .get('/', async (req, res, next) => {
    try {
      res.json(await Quote.getAll(req.query.page))
    } catch (err) {
      console.error('Error while getting quotes: ', err.message)
      next(err)
    }
  })

  // Get a specific quote
  .get('/:id', async (req, res, next) => {
    try {
      res.json(await Quote.getById(req.params.id))
    } catch (err) {
      console.error('Error while getting quotes: ', err.message)
      next(err)
    }
  })
