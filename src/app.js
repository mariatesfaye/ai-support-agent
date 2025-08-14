require('dotenv').config();
const express = require('express');
const routes = require('./routes/api');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  logger.info(`SupportGenie running on port ${PORT}`);
});