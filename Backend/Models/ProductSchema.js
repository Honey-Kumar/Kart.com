const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
const ProductSchema = mongoose.Schema(
    {
        name: { type: String, required: [true, 'Please Enter Product Name'], trim: true },
        description: { type: String, required: [true, 'Please Enter Product Details'] },
        price: { type: Number, required: [true, 'Please Enter Product Price'] },
        ratings: { type: Number, default: 0 },
        image: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        category: [{
            type: String,
            required: [true, 'Please Enter Product Category']
        }],
        stock: {
            type: Number,
            required: [true, 'Please Enter Product Stock'],
            maxlength: [10000, 'Maximum Stocks length exceeded. Please Increase the Stock Length'],
            default: 1
        },
        noOfreviews: {
            type: Number,
            default: 0
        },
        review:
            [{
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true
                },
                Comment: {
                    type: String,
                    required: true
                },
                createdBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    default: UserSchema._id
                },
            }],
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }

)

module.exports = mongoose.model("Product", ProductSchema)