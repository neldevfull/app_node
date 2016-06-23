var express    = require('express');
var bodyParser = require('body-parser');

// Models
var User     = require('../app/models/user')();
var Customer = require('../app/models/customer')();
var Service  = require('../app/models/service')();

// Routes
var users     = require('../app/routes/users');
var customers = require('../app/routes/customers');
var services  = require('../app/routes/services');

module.exports = function() {
    var app = express();

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Load routes
    users(app, User);
    customers(app, Customer);
    services(app, Service, Customer);

    return app;
}