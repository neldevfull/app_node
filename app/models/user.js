var db = require('../../config/connection');

module.exports = function() {
    var Schema = db.Schema;

    var user = Schema({
        id: String,
        email: String,
        password: String
    });

    return db.model('User', user);
}