const { gql } = require('apollo-server-hapi')

const typeDefs = gql`
    # type Query {
    #     "A simple type for getting started!"
    #     hello: String
    # }
    type Query {
        location(id: ID!): Location
        locations: [Location]!
    }
    
    type Mutation {
        addLocation(launchIds: [ID]!): LocationUpdateResponse!
        removeLocation(launchId: ID!): LocationUpdateResponse!
        # login(email: String): String # login token
    }

    type LocationUpdateResponse {
        success: Boolean!
        message: String
        location: Location
    }


    type Location {
        id: ID!
        name: String
        address: String
        lat: Float
        lng: Float
        type: String
    }
`
/*
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(60),
  address varchar(80),
  lat float(10,6),
  lng float(10,6),
  type varchar(30),

  PRIMARY KEY (id)

*/

// A map of functions which return data for the schema.
// const resolvers = {
//     Query: {
//         hello: () => 'world'
//     }
// }

// module.exports = {
//     typeDefs//,
//     // resolvers
// }
module.exports = typeDefs
