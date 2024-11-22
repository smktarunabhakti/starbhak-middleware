const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const oAuth2client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET);
oAuth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});


export const otpService = async (to: string,subject: string,html: string) => {

    const accessToken = await oAuth2client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE_OAuth2,
        auth: {
            type: process.env.TYPE,
            user: process.env.USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken:accessToken
        }
    });

    await transporter.sendMail({to,subject,html});
    return {
        success: true,
        message: "Send mail successful"
    }
}