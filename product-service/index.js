const {faker} = require('@faker-js/faker')
const moment = require('moment');

setInterval(() => {
  const action = faker.helpers.arrayElement(['created', 'updated', 'deleted']);
  const productID = faker.string.uuid();
  const productName = faker.commerce.productName();
  const productDescription = faker.commerce.productDescription();
  const productPrice = faker.commerce.price();
  const timestamp = moment().toISOString();

  const logMessage = `${timestamp} [Product Service] Product ${productID} ${action}. Name: ${productName}, Description: ${productDescription}, Price: ${productPrice}`;
  console.log(logMessage);
}, 500);

setInterval(() => {
  const errorType = faker.helpers.arrayElement(['DatabaseError', 'NetworkError', 'ApplicationError']);
  const errorMessage = faker.lorem.paragraphs(2)
  const timestamp = moment().toISOString();
  console.error(`[ERROR][${errorType}] ${timestamp} ${errorMessage}`);
}, 20000);

setInterval(() => {
  const warningMessage = faker.lorem.paragraphs(2);
  const timestamp = moment().toISOString();
  console.log(`[WARN] ${timestamp} ${warningMessage}`);
}, 5000);