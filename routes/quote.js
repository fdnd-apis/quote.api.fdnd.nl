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

// TODO
// .get('/v1/:searchString', async (req, res, next) => {})
// .get('/v1/quotes/length/asc', async (req, res, next) => {})
// .get('/v1/quotes/length/desc', async (req, res, next) => {})
// .get('/v1/quotes/alphabetical/asc', async (req, res, next) => {})
// .get('/v1/quotes/alphabetical/desc', async (req, res, next) => {})

// Make quotes like this:
// Table: quote Columns: quoteId, authorId, text
// Table: tag Columns: tagId, text
// Table: itemTag Columns: quoteId, tagId
