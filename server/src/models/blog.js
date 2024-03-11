const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
    judul: {
        type: String
    },
    tanggal: {
        type: Date
    },
    penulis: {
        type: String,
    },
    gambar: {
        type: String,
    },
    narasi: {
        type: String,
        require: true
    },
    narasi_2: {
        type: String
    },

});

const blogModel = mongoose.model("blog", blogSchema);
module.exports = blogModel;