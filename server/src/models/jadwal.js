const mongoose = require('mongoose');
const { Schema } = mongoose;

const jadwalSchema = new Schema({
    misa: {
        type: String
    },
    hari: {
        type: String
    },
    jam: {
        type: String
    },
})
const jadwalModel = mongoose.model('jadwal', jadwalSchema)
module.exports = jadwalModel