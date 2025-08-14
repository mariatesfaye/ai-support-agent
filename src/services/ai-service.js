const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../utils/logger');

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async categorizeTicket(ticketContent) {
    try {
      const prompt = `Categorize this support ticket and assign priority (low, medium, high):
      
      Ticket Content: "${ticketContent}"
      
      Respond with JSON format: 
      {
        "category": "<category>",
        "priority": "<priority>",
        "suggestedResponse": "<initial response>"
      }`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      logger.error('AI Service Error:', error);
      throw error;
    }
  }

  async generateResponse(ticketContent, context) {
    try {
      const prompt = `Generate a customer support response for this e-commerce ticket:
      
      Ticket: "${ticketContent}"
      Context: ${JSON.stringify(context)}
      
      Respond with a professional, helpful tone.`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return response.text();
    } catch (error) {
      logger.error('AI Response Generation Error:', error);
      throw error;
    }
  }
}

module.exports = new AIService();