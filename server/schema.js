const { gql } = require('apollo-server-hapi')

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => 'world'
    }
}

module.exports = {
    typeDefs,
    resolvers
}
