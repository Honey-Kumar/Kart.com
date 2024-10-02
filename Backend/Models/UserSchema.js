const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const { JWTSecretKey, JWTExpire } = require("../config");

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: [10, 'Name should not exceeds 50 characters of length'],
        minlength: [3, 'Name should be of minimum 3 characters']
    },
    lastname: {
        type: String,
        required: true,
        maxlength: [10, 'Name should not exceeds 50 characters of length'],
        minlength: [3, 'Name should be of minimum 3 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: [validator.isEmail, 'Please Enter a valid Email Address']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be greater than 8 characters'],
        //maxlength: [40, 'Password must be less than 40 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetpassword: String,
    resetpasswordExpire: Date
},
    { timestamps: true }
)

//Creating a event for every updation time a event listener will called
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
})

// creating a method for generating jsonwebtoken while login/register
UserSchema.methods.getJWT = function () {
    return jwt.sign({ id: this._id }, JWTSecretKey, {
        expiresIn: JWTExpire
    });
}

//creating a method for comparing password while login
UserSchema.methods.comparePassword = async function (enteredPassword) {
    console.log(enteredPassword, typeof (enteredPassword))
    return await bcrypt.compare(enteredPassword, this.password);
}

//Method to generate resetPasswordToken
UserSchema.methods.resetpasswordToken = async function () {
    const token = crypto.randomBytes(20).toString("hex");
    this.resetpassword = crypto.createHash('sha256').update(token).digest("hex");
    this.resetpasswordExpire = Date.now() + 20 * 60 * 1000;

    await this.save({ validateBeforeSave: false });

    return token;
}

module.exports = mongoose.model("User", UserSchema)