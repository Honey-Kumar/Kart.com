const { JWTSecretKey } = require("../config");
const UserSchema = require("../Models/UserSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncError = require("./CatchAsyncError");
const jwt = require("jsonwebtoken")

const Authentication = CatchAsyncError(async (req, res, next) => {
    console.log("cookie is ",req?.cookies, req?.cookies?.accessToken)
    if (!req?.cookies || !req?.cookies?.accessToken) {
        return next(new ErrorHandler("Please login to access our platform", 401));
    }

    const token = req.cookies.accessToken;

    try {
        console.log(JWTSecretKey)
        const decodedData = jwt.verify(token, JWTSecretKey);
        req.User = await UserSchema.findById(decodedData.id);
        if (!req.User) {
            return next(new ErrorHandler("User not found", 404));
        }
        console.log('User authenticated:', req.User); // Log authenticated user
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
});


const forAdmin = CatchAsyncError(async (req, res, next) => {
    const token = req.cookies.accessToken;
    const decodedata = jwt.verify(token, JWTSecretKey);
    const Userdata = await UserSchema.findOne({ _id: decodedata.id });
    console.log(Userdata);
    if (Userdata.role.toLowerCase() !== "admin") {
        return next(new ErrorHandler(`${req.User.role} does not have right to access this resource`, 403))
    } else {
        next();
    }
})

module.exports = { Authentication, forAdmin }