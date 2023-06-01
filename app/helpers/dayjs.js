const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(utc);
dayjs.extend(isoWeek);

exports.dayjsFormat = dayjs.utc;
exports.formatDateTime = (dateTime) => this.dayjsFormat(dateTime).utc().format('HH:mm DD/MM/YYYY');
exports.formatYearMonthDay = (dateTime) => this.dayjsFormat(dateTime).utc().format('YYYY/MM/DD');
exports.formatDayMonthYear = (dateTime) => this.dayjsFormat(dateTime).utc().format('DD/MM/YYYY');
exports.formatYearMonth = (dateTime) => this.dayjsFormat(dateTime).format('YYYY/MM');

exports.getYear = (dateTime) => new Date(dateTime).getFullYear();
exports.getMonth = (dateTime) => new Date(dateTime).getMonth();
exports.getDate = (dateTime) => new Date(dateTime).getDate();

exports.getIsoWeek = (dateTime) => dayjs(dateTime).isoWeek();
