module.exports = {
    Query: {
        location: (_, { id }, { dataSources }) => dataSources.locationsAPI.getLocationById({ id }),
        locations: (_, __, { dataSources }) => dataSources.locationsAPI.getAllLocations()
    }
}
