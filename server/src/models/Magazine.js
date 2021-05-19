const mongoose = require('mongoose');

const magazine = new mongoose.Schema({

    magazineName : {
        type:String,
        required:true,
    },
    date : {
        type:String,
        required:true,
    },
    downloadURL : {
        type:String,
    },
    photoURL : {
        type:String,
    }
});

const Magazine = mongoose.model("magazines",magazine);

module.exports = Magazine;