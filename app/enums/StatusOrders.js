const Enum = require('./Enum');

module.exports = new Enum({
  PENDING: 'pending',
  SHIPPING: 'shipping',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
});
