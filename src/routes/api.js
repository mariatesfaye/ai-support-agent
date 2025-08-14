const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhooks');

// Zendesk webhook endpoint
router.post('/webhook/zendesk', webhookController.handleNewTicket);

// Follow-up endpoint
router.post('/followup/:ticketId', async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    // Add logic to check ticket status and follow up
    res.status(200).send('Follow-up processed');
  } catch (error) {
    res.status(500).send('Error processing follow-up');
  }
});

module.exports = router;