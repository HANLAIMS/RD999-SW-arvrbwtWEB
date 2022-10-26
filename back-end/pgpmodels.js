require('dotenv').config()
const pgp = require('pg-promise')(/*options*/)
const db = pgp(process.env.DB_CONNECT)

module.exports = {
    db
}