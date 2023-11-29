const {faker} = require('@faker-js/faker')
const moment = require('moment');

setInterval(() => {
  const action = faker.helpers.arrayElement(['registered', 'logged in', 'logged out', 'profile updated']);
  const userID = faker.string.uuid();
  const userName = faker.internet.userName();
  const userEmail = faker.internet.email();
  const timestamp = moment().toISOString();

  const logMessage = `${timestamp} [User Service] User ${userID} ${action}. Username: ${userName}, Email: ${userEmail}`;
  console.log(logMessage);
}, 500);

setInterval(() => {
  const errorType = faker.helpers.arrayElement(['DatabaseError', 'NetworkError', 'ApplicationError']);
  const errorMessage = faker.lorem.paragraphs(2)
  const timestamp = moment().toISOString();
  console.error(`[${errorType}] ${timestamp} ${errorMessage}`);
}, 20000);

setInterval(() => {
  const warningMessage = faker.lorem.paragraphs(2);
  const timestamp = moment().toISOString();
  const logType = faker.helpers.arrayElement(['WARN', 'INFO', 'DEBUG']);
  console.log(`[${logType}] ${timestamp} ${warningMessage}`);
}, 5000);