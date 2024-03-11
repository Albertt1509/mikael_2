const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});

const loginModel = mongoose.model("login", loginSchema);
module.exports = loginModel;