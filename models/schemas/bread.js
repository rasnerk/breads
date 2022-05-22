const mongoose = require('mongoose');

const breadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: 'http://placehold.it/500x500.png' }
})

module.exports = mongoose.model('Bread', breadSchema)
