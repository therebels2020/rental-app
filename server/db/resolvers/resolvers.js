module.exports = {
    Query: {
        location: (_, { locationId }, { dataSources }) => dataSources.locationsAPI.getLocationById({ locationId }),
        locations: (_, __, { dataSources }) => dataSources.locationsAPI.getAllLocations()
    }
}
