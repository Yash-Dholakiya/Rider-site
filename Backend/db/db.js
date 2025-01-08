const mongoose = require('mongoose');


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
            console.log('Connected to DB');
    }).catch((e) => {
        console.log('not connected');
    });
}


module.exports = connectToDb;