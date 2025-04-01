const mongodb = process.env.mongodbURL;
const mongoose = require('mongoose');


module.exports = {
    name: 'ready',
    once: true,
    async execute (client) {
        console.log('Ready!')
        if (!mongodb) return;

        await mongoose.connect(mongodb);

        if (mongoose.connect) {
            console.log('Database connected!')
        }
    }
}