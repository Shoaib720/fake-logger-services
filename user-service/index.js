const { faker } = require('@faker-js/faker');
const moment = require('moment');

// Weighted log levels
function getRandomLogLevel() {
  const levels = ['INFO', 'DEBUG', 'WARN', 'ERROR', 'FATAL'];
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

// Simulate user activity log
function generateUserLog() {
  const level = getRandomLogLevel();
  const timestamp = moment().toISOString();
  const trace_id = faker.string.uuid();
  const ip_address = faker.internet.ipv4();

  const log = {
    timestamp,
    trace_id,
    level,
    service: '[User Service]',
    ip_address
  };

  if (level === 'INFO') {
    const action = faker.helpers.arrayElement([
      'registered',
      'logged_in',
      'logged_out',
      'profile_updated',
      'password_changed',
      'email_verified',
      '2FA_enabled',
      '2FA_disabled',
      'account_locked',
      'account_unlocked',
      'deleted_account',
      'added_payment_method',
      'removed_payment_method',
      'subscribed_to_newsletter',
      'unsubscribed_from_newsletter',
      'accepted_terms_and_conditions',
      'declined_privacy_policy'
    ]);
    Object.assign(log, {
      message: `User ${action}`,
      user_id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      action
    });
  } else if (['ERROR', 'FATAL'].includes(level)) {
    Object.assign(log, {
      message: faker.hacker.phrase(),
      error_type: faker.helpers.arrayElement(['DatabaseError', 'NetworkError', 'ApplicationError']),
      user_id: faker.string.uuid()
    });
  } else {
    log.message = faker.hacker.phrase();
  }

  const json = JSON.stringify(log);
  if (['ERROR', 'FATAL'].includes(level)) console.error(json);
  else console.log(json);
}

// Emit logs regularly
setInterval(generateUserLog, 600);
