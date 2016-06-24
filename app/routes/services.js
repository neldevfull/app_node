var exception = require('../../exceptions/exception')();


module.exports = function(app, Service, Customer) {

    // SAVE the service (INSERT)
    app.post('/api/service', function(request, response) {
        var body = request.body;

        var newService = new Service(body);

        newService.save(function(error, service) {
            if(error) exception('Error save service', error);
            console.log('Saved service \n' + service);
        });
    });

    // Fetch all services (SELECT SEM WHERE)
    app.get('/api/service/all', function(request, response) {
        Service.find({}, function(error, services) {
            if(error) exception('Error service all', error);

            console.log('All services');
            services.forEach(function(service) {
                Customer.find({id: service.customer_id}, function(error, customers) {
                    if(error) exception('Error service all, find customer', error);

                    var customer = customers[0];

                    console.log('id: ' + service.id + ' customer: ' + customer.fullname +
                        ' date: ' + service.date + ' hour initial: ' + service.hour_ini +
                        ' hour end: ' +service.hour_end);
                });
            });
        });
    });

    // GET, Similar to a SELECT WHERE FOR ID
    app.get('/api/service/:id', function(request, response) {
        var id = request.params.id;

        Service.find({id: id}, function(error, service) {
            if(error) console.log(error);

            Service.findById(service[0]._id, function(error, service) {
                if(error) exception('Error service for id', error);

                Customer.find({id: service.customer_id}, function(error, customers) {
                    var customer = null;

                    if(error) exception('Error service for id, find customer', error);

                    customer = customers[0];

                    console.log('id: ' + service.id + ' customer: ' + customer.fullname +
                        ' date: ' + service.date + ' hour initial: ' + service.hour_ini +
                        ' hour end: ' +service.hour_end);

                });
            });
        });
    });

    // Update
    app.put('/api/service', function(request, response) {
        var body = request.body;

        Service.find({id: body.id}, function(error, services) {
            if(error) exception('Error service update', error);

            Service.findByIdAndUpdate(services[0]._id, body, function(error, service) {
                console.log('Updated successfully! \n' + service);
            });
        });
    });

    // Delete
    app.delete('/api/service', function(request, response) {
        var body = request.body;

        Service.find({id: body.id}, function(error, services) {
            if(error) exception('Error service delete', error);

            Service.findByIdAndRemove(services[0]._id, body, function(error, service) {
                console.log('Deleted successfully! \n' + service);
            });
        });
    });
}