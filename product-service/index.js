const { faker } = require('@faker-js/faker');
const moment = require('moment');

// Weighted log levels
function getRandomLogLevel() {
  const levels = ['INFO', 'WARN', 'DEBUG', 'ERROR', 'FATAL'];
  const weights = [0.7, 0.1, 0.1, 0.07, 0.03];
  const total = weights.reduce((a, b) => a + b, 0);
  const threshold = Math.random() * total;

  let cumulative = 0;
  for (let i = 0; i < levels.length; i++) {
    cumulative += weights[i];
    if (threshold < cumulative) return levels[i];
  }
  return 'INFO';
}

// Simulate product log
function generateProductLog() {
  const level = getRandomLogLevel();
  const timestamp = moment().toISOString();
  const trace_id = faker.string.uuid();

  const log = {
    timestamp,
    trace_id,
    level,
    service: '[Product Service]'
  };

  if (level === 'INFO') {
    const action = faker.helpers.arrayElement([
      'created',
      'updated',
      'deleted',
      'price_updated',
      'stock_adjusted',
      'marked_as_featured',
      'marked_as_out_of_stock',
      'discount_applied',
      'discount_removed',
      'image_updated',
      'category_changed',
      'tag_added',
      'tag_removed',
      'description_updated',
      'unpublished',
      'published',
      'archived',
      'restocked'
    ]);
    Object.assign(log, {
      message: `Product ${action}`,
      product_id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      status: action
    });
  } else if (['ERROR', 'FATAL'].includes(level)) {
    Object.assign(log, {
      message: faker.hacker.phrase(),
      error_type: faker.helpers.arrayElement(['DatabaseError', 'NetworkError', 'ApplicationError']),
      product_id: faker.string.uuid()
    });
  } else {
    log.message = faker.hacker.phrase();
  }

  const json = JSON.stringify(log);

  if (['ERROR', 'FATAL'].includes(level)) console.error(json);
  else console.log(json);
}

// Emit logs regularly
setInterval(generateProductLog, 500);
