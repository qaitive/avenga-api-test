import winston from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}] book_validator: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;