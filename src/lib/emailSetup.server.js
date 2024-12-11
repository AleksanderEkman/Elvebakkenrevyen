import nodemailer from 'nodemailer';
import { PRIVATE_GOOGLE_EMAIL, PRIVATE_GOOGLE_EMAIL_PASSWORD } from "$env/static/private";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: PRIVATE_GOOGLE_EMAIL,
        pass: PRIVATE_GOOGLE_EMAIL_PASSWORD
    }
    }
);

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take a message");
    }
})

export default transporter;