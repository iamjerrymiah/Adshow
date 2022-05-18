const nodemailer = require('nodemailer');
const ejs = require('ejs');
const htmlToText = require('html-to-text');

// For create email obj to send actual emails.
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `Ourtechengineering <${process.env.EMAIL_FROM}>`;  
  }

  // Create different transports for different environments
  newTransport() {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendinBlue',
        auth: {
          user: process.env.SENDINBLUE_USERNAME, //SENDGRID ve not logged me in yet
          pass: process.env.SENDINBLUE_PASSWORD
        }
      });
    }


  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = ejs.renderFile(`${__dirname}/../views/email/${template}.ejs`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Ourtechengineering!'); //welcome is the name of the ejs template to be displayed
  }

  //async sendPasswordReset() {
    //await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
  //}
};
