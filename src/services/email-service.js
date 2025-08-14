const sgMail = require('@sendgrid/mail');
const logger = require('../utils/logger');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  async sendNotification(email, subject, content) {
    try {
      const msg = {
        to: email,
        from: process.env.SUPPORT_EMAIL,
        subject: subject,
        text: content,
        html: `<p>${content}</p>`
      };
      
      await sgMail.send(msg);
      logger.info(`Email sent to ${email}`);
    } catch (error) {
      logger.error('Email Error:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();