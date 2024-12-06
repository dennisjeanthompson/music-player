function formatDate(date) {
  return new Date(date).toLocaleString();
}

function validateDateRange(startDate, endDate) {
  if (!startDate || !endDate) return true;
  return new Date(startDate) <= new Date(endDate);
}

module.exports = {
  formatDate,
  validateDateRange
};