const db = require('./db')
const helper = require('./helper')

/**
 *
 * @param {*} quote
 */
const Quote = function (quote) {
  // TODO: Check for sanity...
  this.quoteId = quote.quoteId
}
