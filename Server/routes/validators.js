const dateFormat = require('dateformat');

function validateDate(dateString) {
    const timestamp = Date.parse(dateString);
    if (!isNaN(timestamp)) {
        return dateFormat(new Date(dateString), "yyyy-mm-dd HH:MM:ss");
    }
}

module.exports = validateDate;