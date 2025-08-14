const axios = require('axios');
const logger = require('../utils/logger');

class ZendeskService {
  constructor() {
    this.apiUrl = process.env.ZENDESK_API_URL;
    this.auth = {
      username: process.env.ZENDESK_EMAIL,
      password: process.env.ZENDESK_API_TOKEN
    };
  }

  async getTicket(ticketId) {
    try {
      const response = await axios.get(`${this.apiUrl}/tickets/${ticketId}.json`, {
        auth: this.auth
      });
      return response.data.ticket;
    } catch (error) {
      logger.error('Zendesk Get Ticket Error:', error);
      throw error;
    }
  }

  async updateTicket(ticketId, data) {
    try {
      const response = await axios.put(`${this.apiUrl}/tickets/${ticketId}.json`, 
        { ticket: data },
        { auth: this.auth }
      );
      return response.data.ticket;
    } catch (error) {
      logger.error('Zendesk Update Ticket Error:', error);
      throw error;
    }
  }

  async createTicket(ticketData) {
    try {
      const response = await axios.post(`${this.apiUrl}/tickets.json`, 
        { ticket: ticketData },
        { auth: this.auth }
      );
      return response.data.ticket;
    } catch (error) {
      logger.error('Zendesk Create Ticket Error:', error);
      throw error;
    }
  }
}

module.exports = new ZendeskService();