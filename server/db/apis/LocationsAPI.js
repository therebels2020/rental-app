const { DataSource } = require('apollo-datasource')
// const isEmail = require('isemail')

class LocationAPI extends DataSource {
    constructor ({ db }) {
        super()
        this.db = db
    }

    initialize (config) {
        this.context = config.context
    }

    async getLocationById ({ locationId: idArg } = {}) {
        const locationId = this.context && this.context.location ? this.context.location.locationId : idArg
        const location = await new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM Location WHERE locationId = ? ', [locationId], (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
        return location
    }

    async getAllLocations () {
        return await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM Location ', (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
    }
    // async addLocation ({ launchId }) {
    //     const userId = this.context.user.id
    //     const res = await this.store.trips.findOrCreate({
    //         where: { userId, launchId }
    //     })
    //     return res && res.length ? res[0].get() : false
    // }

    // async removeLocation ({ launchId }) {
    //     const userId = this.context.user.id
    //     return !!this.store.trips.destroy({ where: { userId, launchId } })
    // }
}

module.exports = LocationAPI
