const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new quotes that checks if the passed object adheres the format
 * we need and throws errors if it doesn't
 * @param {*} quote an object containing the necessary fields to make a new quote
 */
const quote = function (quote) {
  // TODO: Check for sanity...
  this.quoteId = quote.quoteId
  this.authorId = quote.authorId
  this.tags = quote.tags
  this.text = quote.text
}

/**
 * Get all quotes from the database, will be paginated if the number of
 * quotes in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of quotes you want to get
 * @returns
 */
quote.getAll = async function (page = 1) {
  const rows = await db.query(
    `SELECT q.quoteId, q.tags, q.text, a.authorId, a.name, a.bio, a.avatar FROM quote as q LEFT JOIN author as a ON q.authorId = a.authorId LIMIT ?,?`,
    [helper.getOffset(page, process.env.LIST_PER_PAGE), Number(process.env.LIST_PER_PAGE)]
  )

  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

/**
 *
 * @param {*} quoteId
 * @returns
 */
quote.getById = async function (quoteId) {
  const rows = await db.query(
    `SELECT q.quoteId, q.tags, q.text, a.authorId, a.name, a.bio, a.avatar FROM quote as q LEFT JOIN author as a ON q.authorId = a.authorId WHERE q.quoteId = ?`,
    [quoteId]
  )

  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

/**
 * Add a new quote to the database
 * @param {*} quote a new quote object created with the quote constructor
 * @returns an object containing the inserted quote with the newly inserted quoteId
 */
quote.create = async function (quote) {
  const rows = await db.query(
    `INSERT INTO quote SET authorId = ?, tags = ?, text = ?`,
    prepareForInsert(quote)
  )
  quote.quoteId = rows.insertId
  return {
    data: [quote],
    meta: {
      insertId: rows.insertId,
    },
  }
}

module.exports = quote

/**
 * Prepares a passed quote object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} quote a new quote object created with the quote constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(quote) {
  return [quote.authorId, quote.tags, quote.text]
}
