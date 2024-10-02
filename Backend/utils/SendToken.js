const { CookieExpire } = require("../config")

const SendToken = (User, msg, statusCode, res) => {
    const token = User.getJWT();

    const options = {
        expires: new Date(Date.now() + CookieExpire * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res.status(statusCode).cookie("accessToken", token, options).json({
        success: true,
        User,
        message: msg,
        token
    })
}

module.exports = SendToken;
