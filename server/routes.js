const path = require('path')

const INDEX_FILE = '../src/index.html'

routes = [
    {
        method: 'GET',
        path: '/',
        handler: {
            file: path.join(__dirname, INDEX_FILE)
        }
    },
    {
        method: 'GET',
        path: '/hello/{name}',
        handler: (request, h) => {
            // console.log(request.params)
            // pluginLoader.loadPlugins()
            return `Hello ${request.params.name}`
        }
    }
]

module.exports = routes
