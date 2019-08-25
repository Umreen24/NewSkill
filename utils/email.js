const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text')

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'Jonas Schmedtmann <hello@jonas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions)
};

module.exports = sendEmail;

// module.exports = class Email {
    //     constructor(user, url) {
//         this.to = user.email;
//         this.firstName = user.name.split('')[0];
//         this.url = url;
//         this.from = `Antonio <${process.env.EMAIL_FROM}>`;
//     }
//     newTransport() {
//         if(process.env.NODE_ENV === 'production') {
            
//             return nodemailer.createTransport({
//                 service: 'SendGrid',
//                 auth: {
//                     user: process.env.SENDGRID_USERNAME,
//                     pass: process.env.SENDGRID_PASSOWORD
//                 }
//             });
//         }
        
//         return nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             auth: {
//                 user: process.env.EMAIL_USERNAME,
//                 pass: process.env.EMAIL_PASSWORD
//         }
//         });
//     }

//     async send(template, subject) {
//         const html = pug.renderFile(
//             `${__dirname}/../views/email/${template}.pug`, 
//             {
//                 firstName: this.firstName,
//                 url: this.url,
//                 subject
//             }
        
//         );

//         const mailOptions = {
//             from: this.from,
//             to: this.to,
//             subject,
//             html,
//             text: htmlToText.fromString(html)
//         };
        
//         await this.newTransport().sendEmail(mailOptions)

//     }
//     async sendWelcome() {
//         await this.send('welcome','Welcome to our classes!');
//     }
//     async sendPasswordReset() {
//         await this.send(
//             'passWordReset',
//             'Your password reset token (valid for only 10 minutes)'
//             );
//     }
// };

