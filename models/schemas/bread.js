const mongoose = require('mongoose');

const breadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hasGluten: Boolean,
    image: {
        type: String,
        default: 'http://placehold.it/500x500.png'
    },
    baker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Baker'
    }
})

// helper methods 
breadSchema.methods.getBakedBy = function(){
    return `${this.name} was baked with love by ${this.baker.name}`
}  

module.exports = mongoose.model('Bread', breadSchema)
