const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        image1: {
            type: String,
        },
        image2: {
            type: String,
        },
        image3: {
            type: String,
        },
        image4: {
            type: String,
        },
        image5: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
        original: {
            type: Number,
            required: true,
        },
        offer: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        category: String,
        subcategory: String,
        requirement: String,
        point1: String,
        point2: String,
        point3: String,
        point4: String,
        point5: String,
        point6: String,
    },
)

module.exports = mongoose.model("Product", productSchema);