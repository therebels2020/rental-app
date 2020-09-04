const db = require('../db.js')
const fs = require('fs')
const config = require('../../../config.js')

fs.readFile(config.database.setupFile, 'utf8', (err, data) => {
    if (err) console.error('2nd err' + err)
    console.log(data)

    db.exec(data)
})
