const nodemailer = require('nodemailer');

export const sendEmail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
           user: process.env.MAIL_USERNAME,
           pass: process.env.MAIL_PASSWORD
        },
    });

    let check = await transporter.sendMail({
        to: to,
        subject: subject,
        html: html,
        from: '"Star MO | SMK Taruna Bhakti Depok" <starmo@smktarunabhakti.net>'
    });

    if(!check){
        return {
            success: false,
            message: "Failed to send mail"
        }
    }

    return {
        success: true,
        message: "Send mail successful"
    }
}