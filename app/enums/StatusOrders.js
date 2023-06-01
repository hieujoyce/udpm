const Enum = require('./Enum');

module.exports = new Enum({
  PENDING: 'pending',
  PROCESSING: 'processing',
  ON_HOLD: 'on-hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  FAILED: 'failed',
  TRASH: 'trash',
});
