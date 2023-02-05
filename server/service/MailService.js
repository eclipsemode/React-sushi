const path = require('path');
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

class MailService {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    this.transporter.use('compile', hbs({
      viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/',
        defaultLayout: false,
        partialsDir: 'views/',
      },
      viewPath: 'views/',
      extName: '.hbs'
    }));
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'Суши-бар <sushi@company.com>',
      to,
      subject: 'Суши-бар. Активация аккаунта.',
      text: "",
      attachments: [{
        filename: 'register.png',
        path: 'views/assets/register.png',
        cid: 'registerImg'
      }],
      template: 'post-activation',
      context: {
        link
      }
    }, (error) => {
      if (error) {
        return console.error(error.message);
      }
      return console.log('Email sent!!!');
    });
  }
}

module.exports = new MailService();