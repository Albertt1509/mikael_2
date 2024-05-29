const mongoose = require("mongoose");
const { Schema } = mongoose;

const mediaSchema = new Schema({
    narasi: {
        type: String,
    },
    link: {
        type: String,
    },
    gallery: {
        type: String,
    }
});

const MediaModel = mongoose.model('Media', mediaSchema); // Menggunakan mongoose.model dengan nama model 'Media'
module.exports = MediaModel;
