const sqlite3 = require('sqlite3').verbose()
const config = require('../../config.js')

const db = new sqlite3.Database(config.database.file, err => {
    if (err) {
        console.error('--eerr--')
        console.error(err)
    }
    console.log(db)
})

module.exports = db
