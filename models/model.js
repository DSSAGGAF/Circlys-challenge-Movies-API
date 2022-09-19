const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    showtimes:{
        type: Array, 
        required: true
    }
})

module.exports = mongoose.model('Data', dataSchema)