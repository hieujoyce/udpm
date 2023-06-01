const { createLogger, format, transports } = require('winston');
const config = require('./config');
const { combine, printf } = format;
const winstonFormat = printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`
);
const { timestamp } = format;
const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    winstonFormat,
    config.env === 'development' ? format.colorize() : format.uncolorize()
  ),
  transports: [new transports.Console()],
});
module.exports = logger;
