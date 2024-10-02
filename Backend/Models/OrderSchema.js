const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
const OrderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    order: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true,
            },
            productData: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Product",
                required: true
            },
        }
    ],
    User: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        default: UserSchema._id
    },
    payment: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        method: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    itemPrice: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveredAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema);