const path = require('path')

module.exports = {
    server: {
        host: '127.0.0.1',
        port: 1234
    },
    database: {
        file: path.join(__dirname, 'server/db/data/rentalapp.db'),
        setupFile: path.join(__dirname, 'server/db/setup.sql')
    }
}