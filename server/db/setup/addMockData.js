const db = require('../db.js')
const fs = require('fs')
const path = require('path')

// db.run(data)

fs.readFile(path.join(__dirname, './mockdata/Location.sql'), 'utf8', (err, data) => {
    if (err) console.error('2nd err' + err)
    console.log(data)

    db.run(data)
})

fs.readFile(path.join(__dirname, './mockdata/Review.sql'), 'utf8', (err, data) => {
    if (err) console.error('2nd err' + err)
    console.log(data)

    db.run(data)
})

fs.readFile(path.join(__dirname, './mockdata/User.sql'), 'utf8', (err, data) => {
    if (err) console.error('2nd err' + err)
    console.log(data)

    db.run(data)
})