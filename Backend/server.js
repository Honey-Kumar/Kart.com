const app = require("./app");
const express = require("express");
const connectDB = require("./databse");
const cookieparser = require("cookie-parser");
const { PORT, Cloudinaryname, Cloudinaryapikey, Cloudinaryapisecret, FrontendOrigin } = require("./config");
const Productrouter = require("./Router/products");
const UserRouter = require("./Router/User");
const ErrorMiddleware = require("./Middlewares/Error");
const OrderRouter = require("./Router/Orders");
const cors = require("cors")
const cloudinary = require("cloudinary")
const fileuploader = require("express-fileupload");
const PaymentRouter = require("./Router/Payment");
const path = require('path')

//handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error occured : ${err.message}`)
    console.log(`Shutting down the shopy.com Server due to uncaughtException.....`)
    server.close();
    process.exit(1);
})

//configure app usage 
app.use(cors({ credentials: true, origin: `${FrontendOrigin}` }));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileuploader({
    useTempFiles: true,  // This will store files temporarily on disk
    tempFileDir: '/tmp/'  // Directory where temporary files will be stored
}))
app.use(Productrouter);
app.use(UserRouter);
app.use(OrderRouter);
app.use(PaymentRouter);
app.use(ErrorMiddleware);

// connecting databse
connectDB();
cloudinary.config({
    cloud_name: Cloudinaryname,
    api_key: Cloudinaryapikey,
    api_secret: Cloudinaryapisecret // Click 'View API Keys' above to copy your API secret
})



//listen app on port
const server = app.listen(PORT, () => {
    console.log(`Shopy.com is working on PORT:${PORT}`);
})

//handling Unhandle Promise Rejection Error
process.on("unhandledRejection", (err) => {
    console.log(`Error occured : ${err.message}`)
    console.log(`Shutting down the shopy.com Server due to unhandledRejection Exception.....`)
    server.close();
    process.exit(1);
})