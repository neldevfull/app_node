module.exports = function(app, Customer) {

    // SAVE the customer (INSERT)
    app.post('/api/customer', function(request, response) {
        var body = request.body;

        var newCustomer = new Customer(body);

        newCustomer.save(function(error, customer) {
            if(error) {
                console.log('Error save customer');
                throw error;
            }

            console.log('Saved customer \n' + customer);
        });
    });

    // Fetch all customers (SELECT SEM WHERE)
    app.get('/api/customer/all', function(request, response) {
        Customer.find({}, function(error, customers) {
            if(error) {
                console.log("Error customer all");
                console.log(error);
                throw error;
            }

            console.log('All customers')
            customers.forEach(function(customer) {
                console.log('id: ' + customer.id + ' name: ' + customer.name +
                    ' address: ' + customer.address + ' RG: ' + customer.rg +
                    ' CPF: ' + customer.cpf);
            });
        });
    });

    // GET, Similar to a SELECT WHERE FOR ID
    app.get('/api/customer/:id', function(request, response) {
        var id = request.params.id;

        Customer.find({id: id}, function(error, customer) {
            if(error) console.log(error);

            Customer.findById(customer[0]._id, function(error, customer) {
                if(error) console.log(error);

                console.log('id: ' + customer.id + ' name: ' + customer.name +
                    ' address: ' + customer.address + ' RG: ' + customer.rg +
                    ' CPF: ' + customer.cpf);
            });
        });
    });
}