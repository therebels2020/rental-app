const Path = require('path')

const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert') // For serving static files

// config = require('dotenv').config().parsed
const routes = require('./routes')

const PORT = 1234
const HOST = '127.0.0.1'

const init = async () => {
    const server = new Hapi.server({
        port: PORT,
        host: HOST
    })

    await server.register([
        Inert
    ])
    server.route(routes)

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(1)
})


init()
