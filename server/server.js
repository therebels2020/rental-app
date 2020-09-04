// const Path = require('path')
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert') // For serving static files
const { ApolloServer } = require('apollo-server-hapi')

// config = require('dotenv').config().parsed
const routes = require('./routes.js')
const typeDefs = require('./schema.js')
const LocationsAPI = require('./db/apis/LocationsAPI.js')

const db = require('./db/db.js')

const PORT = 1234
const HOST = '127.0.0.1'

const init = async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        // resolvers: apollo.resolvers
        // dataSources: () => ({
        //     locationsAPI: new LocationsAPI({ db })
        // })
    })

    // eslint-disable-next-line new-cap
    const server = new Hapi.server({
        port: PORT,
        host: HOST
    })

    await apolloServer.applyMiddleware({
        app: server
    })

    await apolloServer.installSubscriptionHandlers(server.listener)

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
