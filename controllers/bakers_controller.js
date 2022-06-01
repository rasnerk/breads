const Baker = require('../models/schemas/baker')
const bakerSeedData = require('../seeders/seed-bakers')

const seedBakerData = (req,res) => {
    Baker.insertMany(bakerSeedData).then(res.redirect('/breads'))
}

module.exports = { seedBakerData }