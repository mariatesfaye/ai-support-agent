const { CloudSchedulerClient } = require('@google-cloud/scheduler');
const zendeskService = require('../services/zendesk-service');
const logger = require('./logger');

const client = new CloudSchedulerClient();

async function scheduleFollowUp(ticketId, followUpTime) {
  try {
    const parent = client.locationPath(process.env.GCP_PROJECT_ID, process.env.GCP_LOCATION);
    const jobName = `followup-${ticketId}-${Date.now()}`;
    
    const job = {
      name: `${parent}/jobs/${jobName}`,
      httpTarget: {
        uri: `${process.env.APP_URL}/api/followup/${ticketId}`,
        httpMethod: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      schedule: followUpTime.toISOString(),
      timeZone: 'UTC'
    };
    
    const [response] = await client.createJob({ parent, job });
    logger.info(`Created follow-up job: ${response.name}`);
    return response;
  } catch (error) {
    logger.error('Scheduler Error:', error);
    throw error;
  }
}

module.exports = {
  scheduleFollowUp
};