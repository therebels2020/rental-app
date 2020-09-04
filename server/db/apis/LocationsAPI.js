const { DataSource } = require('apollo-datasource')
// const isEmail = require('isemail')

class UserAPI extends DataSource {
    constructor ({ db }) {
        super()
        this.db = db
    }

    /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
    initialize (config) {
        this.context = config.context
    }

    /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
    async findLocationByID ({ id: idArg } = {}) {
        const id = this.context && this.context.location ? this.context.location.id : idArg
        // if (!id || !isLocationID.validate(id)) return null

        // const locations = await this.store.locations.findOrCreate({ where: { id } })
        const location = await new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM Location WHERE id = ? ', [id], (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
        // return locations && locations[0] ? locations[0] : null
        // return location ? location : null
        return location
    }

    async addLocation ({ launchId }) {
        const userId = this.context.user.id
        const res = await this.store.trips.findOrCreate({
            where: { userId, launchId }
        })
        return res && res.length ? res[0].get() : false
    }

    async removeLocation ({ launchId }) {
        const userId = this.context.user.id
        return !!this.store.trips.destroy({ where: { userId, launchId } })
    }
}

module.exports = UserAPI
