var db = require('../../config/connection');

module.exports = function() {
    var Schema = db.Schema;

    var customer = Schema({
        id: String,
        name: String,
        address: String,
        rg: String,
        cpf: String
    });

    return db.model('Customer', customer);
}