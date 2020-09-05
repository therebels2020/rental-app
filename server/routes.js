const path = require('path')
const db = require('./db/db.js')

const INDEX_FILE = '../src/index.html'

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: {
            file: path.join(__dirname, INDEX_FILE)
        }
    },
    {
        method: 'GET',
        path: '/api/reviews/{locationId}',
        handler: (request, h) => {
            // console.log(request.params.locationId)
            return new Promise((resolve, reject) => {
                db.all(
                    `
                    SELECT Review.locationId, Review.userId, Review.overallScore, Review.reviewDate,
                        Moisture.hasLeaks, Moisture.hasMould, Moisture.isDamp, Moisture.mouldLocation, Moisture.comments as moistureComments,
                        Heating.hasFire, Heating.hasHeaters, Heating.hasHeatpump, Heating.warmth, Heating.comments as heatingComments,
                        Insulation.doubleGlazed, Insulation.underFloor, Insulation.wallAndCeiling, Insulation.comments as insulationComments,
                        Maintenance.hasDrafts, Maintenance.hasEarthquakeDamage, Maintenance.comments as maintenanceComments,
                        Ventilation.hasExtractorFans, Ventilation.hasWindows, Ventilation.comments as ventilationComments,
                        WaterQuality.cleanWater, WaterQuality.goodPressure, WaterQuality.comments as waterQualityComments
                    FROM Review 
                        LEFT JOIN Moisture 
                        ON Review.locationId = Moisture.locationId AND Review.userId = Moisture.userId 
                        LEFT JOIN Heating 
                        ON Review.locationId = Heating.locationId AND Review.userId = Heating.userId
                        LEFT JOIN Insulation 
                        ON Review.locationId = Insulation.locationId AND Review.userId = Insulation.userId
                        LEFT JOIN Maintenance 
                        ON Review.locationId = Maintenance.locationId AND Review.userId = Maintenance.userId
                        LEFT JOIN Ventilation 
                        ON Review.locationId = Ventilation.locationId AND Review.userId = Ventilation.userId
                        LEFT JOIN WaterQuality 
                        ON Review.locationId = WaterQuality.locationId AND Review.userId = WaterQuality.userId
                    WHERE Review.locationId = ?
                    ORDER BY reviewDate DESC
                    `, [request.params.locationId], (err, data) => {
                        if (err) reject(err)
                        resolve(JSON.stringify(data))
                    })
            })
        }
    },
    {
        method: 'GET',
        path: '/api/reviews/{locationId}/{userId}',
        handler: (request, h) => {
            return new Promise((resolve, reject) => {
                db.all(
                    `
                    SELECT Review.locationId, Review.userId, Review.overallScore, Review.reviewDate,
                        Moisture.hasLeaks, Moisture.hasMould, Moisture.isDamp, Moisture.mouldLocation, Moisture.comments as moistureComments,
                        Heating.hasFire, Heating.hasHeaters, Heating.hasHeatpump, Heating.warmth, Heating.comments as heatingComments,
                        Insulation.doubleGlazed, Insulation.underFloor, Insulation.wallAndCeiling, Insulation.comments as insulationComments,
                        Maintenance.hasDrafts, Maintenance.hasEarthquakeDamage, Maintenance.comments as maintenanceComments,
                        Ventilation.hasExtractorFans, Ventilation.hasWindows, Ventilation.comments as ventilationComments,
                        WaterQuality.cleanWater, WaterQuality.goodPressure, WaterQuality.comments as waterQualityComments
                    FROM Review 
                        LEFT JOIN Moisture 
                        ON Review.locationId = Moisture.locationId AND Review.userId = Moisture.userId 
                        LEFT JOIN Heating 
                        ON Review.locationId = Heating.locationId AND Review.userId = Heating.userId
                        LEFT JOIN Insulation 
                        ON Review.locationId = Insulation.locationId AND Review.userId = Insulation.userId
                        LEFT JOIN Maintenance 
                        ON Review.locationId = Maintenance.locationId AND Review.userId = Maintenance.userId
                        LEFT JOIN Ventilation 
                        ON Review.locationId = Ventilation.locationId AND Review.userId = Ventilation.userId
                        LEFT JOIN WaterQuality 
                        ON Review.locationId = WaterQuality.locationId AND Review.userId = WaterQuality.userId
                    WHERE Review.locationId = ? AND Review.userId = ?
                    ORDER BY 1
                    `, [request.params.locationId, request.params.userId], (err, row) => {
                        if (err) reject(err)
                        resolve(row)
                    })
            })
        }
    },
    {
        method: 'POST',
        path: '/api/reviews',
        handler: (request, h) => {
            // Add a review
            // waterQuality
            console.log(request.payload)
            const { id, review, moisture, heating, insulation, maintenance, ventilation, waterQuality } = request.payload
            const queries = [
                {
                    query: `
                        INSERT INTO Review (locationId, userId, overallScore, reviewDate)
                        VALUES (?, ?, ?, ?)
                        `,
                    params: [id.locationId, id.userId, review.overallScore, review.reviewDate]
                },
                {
                    query: `
                        INSERT INTO Moisture (locationId, userId, hasLeaks, isDamp, hasMould, mouldLocation, comments)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                        `,
                    params: [id.locationId, id.userId, moisture.hasLeaks, moisture.isDamp, moisture.hasMould, moisture.mouldLocation, moisture.comments]
                },
                {
                    query: `
                        INSERT INTO Heating (locationId, userId, hasHeatpump, hasFire, hasHeaters, warmth, comments)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                        `,
                    params: [id.locationId, id.userId, heating.hasHeatpump, heating.hasFire, heating.hasHeaters, heating.warmth, heating.comments]
                },
                {
                    query: `
                        INSERT INTO Insulation (locationId, userId, doubleGlazed, underFloor, wallAndCeiling, comments)
                        VALUES (?, ?, ?, ?, ?, ?)
                        `,
                    params: [id.locationId, id.userId, insulation.doubleGlazed, insulation.underFloor, insulation.wallAndCeiling, insulation.comments]
                },
                {
                    query: `
                        INSERT INTO Maintenance (locationId, userId, hasDrafts, hasEarthquakeDamage, comments)
                        VALUES (?, ?, ?, ?, ?)
                        `,
                    params: [id.locationId, id.userId, maintenance.hasDrafts, maintenance.hasEarthquakeDamage, maintenance.comments]
                },
                {
                    query: `
                        INSERT INTO Ventilation (locationId, userId, hasExtractorFans, hasWindows, comments)
                        VALUES (?, ?, ?, ?, ?)
                        `,
                    params: [id.locationId, id.userId, ventilation.hasExtractorFans, ventilation.hasWindows, ventilation.comments]
                },
                {
                    query: `
                        INSERT INTO WaterQuality (locationId, userId, cleanWater, goodPressure, comments)
                        VALUES (?, ?, ?, ?, ?)
                        `,
                    params: [id.locationId, id.userId, waterQuality.cleanWater, waterQuality.goodPressure, waterQuality.comments]
                }
            ]

            return Promise.all(queries.map(q => new Promise((resolve, reject) => {
                db.get(q.query, q.params, (err, data) => {
                    if (err) reject(err)
                    resolve(data)
                })
            }))).then(response => JSON.stringify(response))
        }
    },
    {
        method: 'GET',
        path: '/api/locations',
        handler: (request, h) => {
            return new Promise((resolve, reject) => {
                db.all('SELECT * FROM Location ', (err, data) => {
                    if (err) reject(err)
                    resolve(JSON.stringify(data))
                })
            })
        }
    },
    {
        method: 'GET',
        path: '/api/locations/{locationId}',
        handler: (request, h) => {
            // return `Hello ${request.params.locationId}`
            return new Promise((resolve, reject) => {
                db.get('SELECT * FROM Location WHERE locationId = ? ', [request.params.locationId], (err, row) => {
                    if (err) reject(err)
                    resolve(JSON.stringify(row))
                })
            })
        }
    }
]

module.exports = routes
