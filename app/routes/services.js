module.exports = function(app, Service, Customer) {

    // SAVE the service (INSERT)
    app.post('/api/service', function(request, response) {
        var body = request.body;

        var newService = new Service(body);

        newService.save(function(error, service) {
            if(error) {
                console.log('Error save service');
                throw error;
            }

            console.log('Saved service \n' + service);
        });
    });

    // Fetch all services (SELECT SEM WHERE)
    app.get('/api/service/all', function(request, response) {
        Service.find({}, function(error, services) {
            if(error) {
                console.log("Error service all");
                console.log(error);
                throw error;
            }

            console.log('All services')
            services.forEach(function(service) {
                Customer.find({id: service.customer.id}, function(error, customer) {
                    console.log('id: ' + service.id + ' customer: ' + service.name +
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
                if(error) console.log(error);

                Customer.find({id: service.customer.id}, function(error, customer) {
                    console.log('id: ' + service.id + ' customer: ' + service.name +
                        ' date: ' + service.date + ' hour initial: ' + service.hour_ini +
                        ' hour end: ' +service.hour_end);

                });
            });
        });
    });
}