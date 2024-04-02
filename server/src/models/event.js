const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchema = new Schema({
    judul: {
        type: String,
    },
    gambar: {
        type: String,
    },
    descript: {
        type: String,
    },
    contact: {
        type: String,
    }
})

const eventModel = mongoose.model('event', eventSchema)
module.exports = eventModel