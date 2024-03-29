'use strict';

const {logger} = require(`../../helpers`);
const {Http} = require(`../../constants`);

const logRequests = (req, res, next) => {
  logger.debug(`[REQUEST]: method - ${req.method}, url - ${req.url}, body - ${JSON.stringify(req.body)}`);

  const afterResponse = () => {
    logger.debug(`[RESPONSE]: method - ${req.method}, url - ${req.url}, status - ${res.statusCode}`);
    if (res.statusCode === Http.NOT_FOUND) {
      logger.info(`[ERROR]: 404 - not found. Url: ${req.url}`);
    }
    res.removeListener(`finish`, afterResponse);
    res.removeListener(`close`, afterResponse);
  };

  res.on(`close`, afterResponse);
  res.on(`finish`, afterResponse);

  next();
};

module.exports = logRequests;
