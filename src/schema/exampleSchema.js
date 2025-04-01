const mongoose = require('mongoose');

const example = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        unique: true,
    }
});

module.exports = new mongoose.model('exampleDB', example);