const { gql } = require('apollo-server-hapi')

const typeDefs = gql`
    # type Query {
    #     "A simple type for getting started!"
    #     hello: String
    # }
    scalar Date

    type Query {
        location(locationId: ID!): Location
        locations: [Location]!
    }
    
    type Mutation {
        addLocation(launchIds: [ID]!): LocationUpdateResponse!
        removeLocation(launchId: ID!): LocationUpdateResponse!
    }

    type LocationUpdateResponse {
        success: Boolean!
        message: String
        location: Location
    }

    type Location {
        locationId: ID!
        name: String
        address: String
        lat: Float
        lng: Float
        type: String
    }

    type User {
        userId: Int,
        userName: String,
        fName: String,
        lName: String,
        password: String,
        address: String,
        phoneNumber: Int,
        dob: Date,
        subExpiry: Date,
    }

    type Review {
        locationId: ID!,
        userId: ID!,
        overallScore: Int,
        reviewDate: Date
    }

    type Moisture {
        locationId: ID!,
        userId: ID!,
        hasLeaks: Boolean,
        isDamp: Boolean,
        hasMould: Boolean,
        mouldLocation: String,
        comments: String
    }

    type Insulation {
        locationId: ID!,
        userId: ID!,
        doubleGlazed: Boolean,
        underFloor: Boolean,
        wallAndCeiling: Boolean,
        comments: String
    }

    type Heating {
        locationId: ID!,
        userId: ID!,
        hasHeatpump: Boolean,
        hasFire: Boolean,
        hasHeaters: Boolean,
        warmth: Int,
        comments: String
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
