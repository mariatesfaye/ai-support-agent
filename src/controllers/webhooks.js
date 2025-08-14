const aiService = require('../services/ai-service');
const zendeskService = require('../services/zendesk-service');
const emailService = require('../services/email-service');
const logger = require('../utils/logger');

async function handleNewTicket(req, res) {
  try {
    const ticket = req.body.ticket;
    logger.info(`Processing new ticket #${ticket.id}: ${ticket.subject}`);
    
    // Step 1: Categorize ticket using AI
    const analysis = await aiService.categorizeTicket(ticket.description);
    
    // Step 2: Update ticket with category and priority
    await zendeskService.updateTicket(ticket.id, {
      tags: [...(ticket.tags || []), analysis.category],
      priority: analysis.priority,
      custom_fields: [
        { id: 'ai_category', value: analysis.category },
        { id: 'ai_priority', value: analysis.priority }
      ]
    });
    
    // Step 3: If it's a common issue, respond immediately
    if (analysis.priority === 'low') {
      const response = await aiService.generateResponse(
        ticket.description,
        { category: analysis.category }
      );
      
      await zendeskService.createTicket({
        subject: `Re: ${ticket.subject}`,
        comment: { body: response },
        via: { channel: 'email' },
        requester_id: ticket.requester_id,
        ticket_form_id: ticket.ticket_form_id
      });
    }
    
    res.status(200).send('Ticket processed successfully');
  } catch (error) {
    logger.error('Webhook Error:', error);
    res.status(500).send('Error processing ticket');
  }
}

module.exports = {
  handleNewTicket
};