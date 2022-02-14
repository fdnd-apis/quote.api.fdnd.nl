const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new authors that checks if the passed object adheres the format
 * we need and throws errors if it doesn't
 * @param {*} author an object containing the necessary fields to make a new author
 */
const author = function (author) {
  // TODO: Check for sanity...
  this.authorId = author.authorId
  this.name = author.name
  this.bio = author.bio
  this.avatar = author.avatar
}

/**
 * Get all authors from the database, will be paginated if the number of
 * authors in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of authors you want to get
 * @returns
 */
author.getAll = async function (page = 1) {
  const rows = await db.query(`SELECT authorId, name, bio, avatar FROM author LIMIT ?,?`, [
    helper.getOffset(page, process.env.LIST_PER_PAGE),
    Number(process.env.LIST_PER_PAGE),
  ])

  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

/**
 * Add a new author to the database
 * @param {*} author a new author object created with the author constructor
 * @returns an object containing the inserted author with the newly inserted authorId
 */
author.create = async function (author) {
  const rows = await db.query(
    `INSERT INTO author SET name = ?, bio = ?, avatar = ?`,
    prepareForInsert(author)
  )
  author.authorId = rows.insertId
  return {
    data: [author],
    meta: {
      insertId: rows.insertId,
    },
  }
}

module.exports = author

/**
 * Prepares a passed author object for insertion in the db, it's mostly an order
 * thing as the insert query expects an array with a certain order.
 * @param {*} author a new author object created with the author constructor
 * @returns [] an array to be used in the insert query
 */
function prepareForInsert(author) {
  return [author.name, author.bio, author.avatar]
}
