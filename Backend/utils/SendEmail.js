const { AdminHost, AdminEmail, AdminPass } = require("../config");
const nodemailer = require("nodemailer");
const CatchAsyncError = require("../Middlewares/CatchAsyncError");

const SendEmail = CatchAsyncError(async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: AdminHost,
        auth: {
            user: AdminEmail,
            pass: AdminPass,
        },
    })

    const mailoptions = {
        from: AdminEmail,
        to: options.email,
        subject: options.subject,
        html: options.html,
    }

    await transporter.sendMail(mailoptions);
})

module.exports = SendEmail