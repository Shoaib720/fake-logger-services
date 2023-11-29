const {faker} = require('@faker-js/faker')
const moment = require('moment');

setInterval(() => {
  const status = faker.helpers.arrayElement(['placed', 'processing', 'shipped', 'delivered', 'cancelled']);
  const orderID = faker.string.uuid();
  const productID = faker.string.uuid();
  const quantity = faker.number.int(50);
  const customerID = faker.string.uuid();
  const timestamp = moment().toISOString();

  const logMessage = `${timestamp} [Order Service] Order ${orderID} status updated to ${status}. Product ID: ${productID}, Quantity: ${quantity}, Customer ID: ${customerID}`;
  console.log(logMessage);
}, 500);

setInterval(() => {
  const errorType = faker.helpers.arrayElement(['DatabaseError', 'NetworkError', 'ApplicationError']);
  const errorMessage = faker.lorem.paragraphs(2)
  const timestamp = moment().toISOString();
  console.error(`[${errorType}] ${timestamp} ${errorMessage}`);
}, 4000);

setInterval(() => {
  const warningMessage = faker.lorem.paragraphs(2);
  const timestamp = moment().toISOString();
  const logType = faker.helpers.arrayElement(['WARN', 'INFO', 'DEBUG']);
  console.log(`[${logType}] ${timestamp} ${warningMessage}`);
}, 1000);