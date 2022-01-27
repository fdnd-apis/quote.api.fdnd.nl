const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new quotes that checks if the passed object adheres the format
 * we need and throws errors if it doesn't
 * @param {*} quote an object containing the necessary fields to make a new quote
 */
const Quote = function (quote) {
  // TODO: Check for sanity...
  this.quoteId = quote.quoteId
  this.authorId = quote.authorId
  this.text = quote.text
}

/**
 * Get all quotes from the database, will be paginated if the number of
 * quotes in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of quotes you want to get
 * @returns
 */
Quote.getAll = async function (page = 1) {
  const rows = await db.query(
    `SELECT q.quoteId, q.tags, q.text, a.authorId, a.name, a.bio, a.avatar FROM quote as q LEFT JOIN author as a ON q.authorId = a.authorId LIMIT ?,?`,
    [helper.getOffset(page, process.env.LIST_PER_PAGE), process.env.LIST_PER_PAGE]
  )

  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

module.exports = Quote
