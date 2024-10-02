const dotenv = require("dotenv");
dotenv.config({
    path: './config/data.env'
});

const PORT = process.env.PORT
const DBURL = process.env.DBURL
const JWTSecretKey = process.env.JWTSecretKey
const JWTExpire = process.env.JWTExpire
const CookieExpire = process.env.CookieExpire
const AdminEmail = process.env.SMPT_MAIL
const AdminHost = process.env.SMPT_SERVICE
const AdminPass = process.env.SMPT_PASSWORD
const Cloudinaryname = process.env.Cloudinary_name
const Cloudinaryapikey = process.env.Cloudinary_api
const Cloudinaryapisecret = process.env.Cloudinary_api_secret
const RequestURL = process.env.RequestURL
const Razorpayapi = process.env.RZYPAYAPI
const Razorpaysecretkey = process.env.RZTPAYSECRET
const FrontendOrigin = process.env.FrontendOrigin

module.exports = { PORT, DBURL, JWTExpire, JWTSecretKey, CookieExpire, AdminEmail, AdminHost, AdminPass, Cloudinaryapikey, Cloudinaryapisecret, Cloudinaryname, RequestURL, Razorpayapi, Razorpaysecretkey, FrontendOrigin }