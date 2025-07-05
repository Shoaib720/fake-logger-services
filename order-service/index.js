const { faker } = require('@faker-js/faker');
const moment = require('moment');

// Weighted log levels
function getRandomLogLevel() {
  const levels = ['INFO', 'DEBUG', 'WARN', 'ERROR', 'FATAL'];
  const weights = [0.6, 0.15, 0.15, 0.07, 0.03];
  const total = weights.reduce((a, b) => a + b, 0);
  const threshold = Math.random() * total;

  let cumulative = 0;
  for (let i = 0; i < levels.length; i++) {
    cumulative += weights[i];
    if (threshold < cumulative) return levels[i];
  }
  return 'INFO';
}

// Log generator
function generateOrderLog() {
  const level = getRandomLogLevel();
  const timestamp = moment().toISOString();
  const trace_id = faker.string.uuid();
  const ip_address = faker.internet.ipv4();

  const baseLog = {
    timestamp,
    level,
    trace_id,
    service: '[Order Service]',
    ip_address
  };

  if (level === 'INFO') {
    Object.assign(baseLog, {
      message: `Order ${faker.string.uuid()} status updated`,
      status: faker.helpers.arrayElement([
        'placed',
        'pending_payment',
        'payment_failed',
        'processing',
        'packed',
        'shipped',
        'out_for_delivery',
        'delivered',
        'return_initiated',
        'returned',
        'refunded',
        'cancelled',
        'cancel_requested'
      ]),
      product_id: faker.string.uuid(),
      quantity: faker.number.int({ min: 1, max: 100 }),
      customer_id: faker.string.uuid()
    });
  } else if (['ERROR', 'FATAL'].includes(level)) {
    Object.assign(baseLog, {
      error_type: faker.helpers.arrayElement(['DatabaseError', 'NetworkError', 'ApplicationError']),
      message: faker.hacker.phrase()
    });
  } else {
    baseLog.message = faker.hacker.phrase();
  }

  const json = JSON.stringify(baseLog);
  if (['ERROR', 'FATAL'].includes(level)) console.error(json);
  else console.log(json);
}

// Emit logs at varying intervals
setInterval(generateOrderLog, 200); // Every 300ms
