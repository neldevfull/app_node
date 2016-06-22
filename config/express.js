var express    = require('express');
var bodyParser = require('body-parser');

// Routes
var  users = require('../app/routes/users');

module.exports = function() {
    var app = express();

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Load routes
    users(app);

    return app;
}