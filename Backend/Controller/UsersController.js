const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const UserSchema = require("../Models/UserSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const SendEmail = require("../utils/SendEmail");
const SendToken = require("../utils/SendToken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const { RequestURL } = require("../config");


// Create a new User 
const CreateUser = CatchAsyncError(async (req, res, next) => {
    const response = await UserSchema.findOne({ email: req.body.email });
    if (!response) {

        if (!req.file || !req.file.avatar) {
            return next(new ErrorHandler("Must Upload Profile Image", 403))
        }
        const mycloud = await cloudinary.v2.uploader.upload(req.file, {
            folder: 'Users',
            width: 150,
            srop: 'scale'
        })

        const { firstname, lastname, email, password } = req.body
        const newuser = await UserSchema.create({
            firstname,
            lastname,
            email,
            password,
            avatar: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }
        });
        SendToken(newuser, "User Created Successfully", 201, res)
    } else {
        return next(new ErrorHandler("User Already Existed with same credentials", 500));
    }
})

// Delete an existing user
const DeteletUser = CatchAsyncError(async (req, res, next) => {
    const userid = req.params.id;
    const response = await UserSchema.findById({ _id: userid });
    if (!response) {
        return next(new ErrorHandler("User Not Found", 404));
    } else {
        if (response?.avatar?.public_id) {
            const Imgurl = response?.avatar?.public_id
            await cloudinary.v2.uploader.destroy(Imgurl);
        }
        const result = await UserSchema.deleteOne({ _id: userid });
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            response: result
        })
    }
})


//Get list of All Users ---Admin Only
const AllUsersList = CatchAsyncError(async (req, res, next) => {
    const Userlist = await UserSchema.find();
    if (!Userlist) {
        return next(new ErrorHandler("No User Found", 404));
    } else {
        return res.status(200).json({
            success: true,
            message: "Users data list Fetched Successfully",
            response: Userlist
        })
    }
})



//Get User Details By Id
const UserDetails = CatchAsyncError(async (req, res, next) => {
    const userid = req.params.id;
    const Userdata = await UserSchema.findById({ _id: userid });
    if (!Userdata) {
        return next(new ErrorHandler("User Not Found", 404));
    } else {
        return res.status(200).json({
            success: true,
            message: "User Details Fetched Successfully",
            response: Userdata
        })
    }
})

//Update User Details 
const UpdateUser = CatchAsyncError(async (req, res, next) => {
    const userid = req.params.id;
    const userdata = await UserSchema.findById({ _id: userid }).select("+password");
    if (!userdata) {
        return next(new ErrorHandler("User Not Found", 404));
    } else {
        console.log(req.body)
        const updatefields = { ...req.body };
        if (updatefields.avatar) {
            if (userdata?.avatar?.public_id) {
                const Imgurl = userdata?.avatar?.public_id
                await cloudinary.v2.uploader.destroy(Imgurl);
            }
            const mycloud = await cloudinary.v2.uploader.upload(updatefields.avatar, {
                folder: 'Users',
                width: 150,
                srop: 'scale'
            })
            updatefields.avatar = {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }
        }
        if (updatefields?.password) {
            console.log(updatefields?.password, updatefields?.prevpassword)
            if (!updatefields?.prevpassword) {
                return next(new ErrorHandler("Please Enter Previous Password", 403))
            }
            const validatepass = await userdata.comparePassword(updatefields.prevpassword);
            console.log(validatepass)
            if (!validatepass) {
                return next(new ErrorHandler("Please Enter Correct Password", 403))
            }

            updatefields.password = await bcrypt.hash(updatefields.password, 10);
            console.log(updatefields.password)
        }
        if (updatefields.role) {
            return next(new ErrorHandler("You can't change your role", 403));
        }
        delete updatefields.role;
        console.log(updatefields)
        const response = await UserSchema.findByIdAndUpdate(userid, updatefields, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        return res.status(200).json({
            success: true,
            message: "User Details Updated Successfully",
            response
        })
    }
})

//Handling Login and Logout Route

// .....Handling Login In Route 
const LoginUser = CatchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter a valid Email and Password", 404));
    }
    const result = await UserSchema.findOne({ email }).select("+password");
    if (!result) {
        return next(new ErrorHandler("Please Enter a valid Email and Password", 404));
    }
    const PasswordMatch = await result.comparePassword(password);
    if (!PasswordMatch) {
        return next(new ErrorHandler("Please Enter a valid Email and Password", 404));
    }
    SendToken(result, "User Login Successfully", 200, res)

})

//......Handling User Logout Route
const Logout = CatchAsyncError(async (req, res, next) => {
    console.log(req?.cookies, req?.cookies?.accessToken)
    if (!req?.cookies || !req?.cookies?.accessToken) {
        return next(new ErrorHandler("Please login to access our platform", 401));
    }
    res.cookie("accessToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    return res.status(200).json({
        success: true,
        message: "User Logout Successfully"
    });
});

//Managing Password reset Route
//Generate forgetPassword token and send mail
const ForgetPassword = CatchAsyncError(async (req, res, next) => {
    //getting user data from email entered at req.body
    const data = await UserSchema.findOne({ email: req.body.email });
    if (!data) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    const token = await data.resetpasswordToken();
    // await data.save({ validateBeforeSave: false });
    const resetpasswordUrl = `${RequestURL}/user/password/${token}`
    // const resetpasswordUrl = `${req.protocol}:${req.get("host")}/user/password/${token}`;
    //Creating Email structure
    const subject = `Shopy.com Password Recovery Request`;
    const htmlMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; }
            .header { background: #007bff; color: #ffffff; padding: 10px 0; text-align: center; border-radius: 8px 8px 0 0; }
            .content { margin: 20px 0; }
            .footer { text-align: center; margin: 20px 0; font-size: 14px; color: #888888; }
            a { color: #007bff; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Shopy.com</h1>
            </div>
            <div class="content">
                <p>Hello ${data.firstname + ' ' + data.lastname},</p>
                <p>We received a request to reset your password. To reset your password, click the link below:</p>
                <p><a href="${resetpasswordUrl}">${resetpasswordUrl}</a></p>
                <p>If you didn't request this password reset, please ignore this email.</p>
                <p>Regards,</p>
                <p><strong>Shopy.com</strong></p>
                <p>A Platform for All Your Needs.</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Shopy.com. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;
    try {
        SendEmail({
            email: data.email,
            URL: resetpasswordUrl,
            subject,
            html: htmlMessage
        })

        console.log("Email sent")
        return res.status(200).json({
            success: true,
            message: `Email has been sent Successfully to ${data.email}`
        })
    } catch (error) {
        data.resetpassword = undefined;
        data.resetpasswordExpire = undefined;
        await data.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})

const resetUserpassword = CatchAsyncError(async (req, res, next) => {
    const token = req.params.token;
    console.log(token);
    const hashtoken = crypto.createHash('sha256').update(token).digest("hex");
    const result = await UserSchema.findOne({ resetpassword: hashtoken, resetpasswordExpire: { $gt: Date.now() } });
    if (!result) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    //check req.body.password is match with confirm pass
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Both Password Must be a Good Match", 400));
    }

    result.password = req.body.password;
    result.resetpassword = undefined;
    result.resetpasswordExpire = undefined;

    await result.save();

    SendToken(result, 'User Password Reset Successfully', 200, res);
})

module.exports = { CreateUser, DeteletUser, UserDetails, UpdateUser, LoginUser, Logout, ForgetPassword, resetUserpassword, AllUsersList }








