const mongoose =require('mongoose');

//schema
const productSchema =new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    price: {
        type : Number,
        required : true,
    },
    types :{
        type : String,
        require : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
});

//export
module.exports = mongoose.model('Product',productSchema);