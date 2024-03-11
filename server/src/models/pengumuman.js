const mongoose = require('mongoose');
const { Schema } = mongoose;

const pengumumanSchema = new Schema({
    judul: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        required: true,
        default: Date.now
    },
    thumbnail: {
        type: String
    },
    keterangan: {
        type: String
    },
    poin: [{
        type: String
    }]
});

const PengumumanModel = mongoose.model('pengumuman', pengumumanSchema);

module.exports = PengumumanModel;
