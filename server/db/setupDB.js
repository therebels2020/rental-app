const db = require('./db.js')
// const fs = require('fs')
// const sqlite3 = require('sqlite3').verbose()
// const config = require('../../config.js')
const setupQueries = require('./setup/setupQueries.js')

// const db = new sqlite3.Database(config.database.file, (err) => {
//     if (err) return console.error('ERRRRRRRL' + err.message)
//     console.log('Connected to the chinook database.')
// })

db.parallelize(() => {
    setupQueries.forEach(data => db.run(data))
})

// fs.readFile(config.database.setupFile, 'utf8', (err, data) => {
//     if (err) console.error('2nd err' + err)
//     console.log(data)

//     // db.run(data)
// })

// db.close()
