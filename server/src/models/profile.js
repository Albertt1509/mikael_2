const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new Schema({
    nama: {
        type: String
    },
    jabatan: {
        type: String
    },
    keterangan: {
        type: String
    },
    profile: {
        type: String
    },
    sejarah: {
        type: String
    }
})
const profileModel = mongoose.model('profile', profileSchema)
module.exports = profileModel