require('dotenv').config()
const pgp = require('pg-promise')(/*options*/)
const db = pgp(process.env.DB_CONNECT)

// postgres test
// db.one('SELECT $1 AS value', 123)
//   .then((data) => {
//     console.log('DATA:', data.value)
//   })
//   .catch((error) => {
//     console.log('ERROR:', error)
//   })

// sqlite test
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db-dev.sqlite',
//     // https://github.com/sequelize/sequelize/issues/8417
//     operatorsAliases: Sequelize.Op,
//     logging: console.log
//   });

module.exports = {
    db
}