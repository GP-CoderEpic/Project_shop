const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    costPrice: {
        type: Number,
        require: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    ExpiryDate: {
        type: String,
        required: false,
    },
    Stock: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Product = model('product', productSchema);

module.exports = Product;