var db = require('../../config/connection');

module.exports = function() {
    var Schema = db.Schema;

    var service = Schema({
        id: String,
        customer_id: String,
        date: String,
        hour_ini: String,
        hour_end: String
    });

    return db.model('Service', service);
}