module.exports = function(app, User) {

    // Rendering index, example with browser
    app.get('/', function(request, response) {
        response.render('index');
    });

    // SAVE the user (INSERT)
    app.post('/api/user', function(request, response) {
        var body = request.body;

        var newUser = new User(body);

        newUser.save(function(error, user) {
            if(error) {
                console.log('Error save user');
                throw error;
            }

            console.log('Saved user \n' + user);
        });
    });

    // Fetch all users (SELECT SEM WHERE)
    app.get('/api/user/all', function(request, response) {
        User.find({}, function(error, users) {
            if(error) {
                console.log("Error user all");
                console.log(error);
                throw error;
            }

            console.log('All users')
            users.forEach(function(user) {
                console.log('id: ' + user.id + ' email: ' + user.email);
            });
        });
    });

    // GET, Similar to a SELECT WHERE FOR ID
    app.get('/api/user/:id', function(request, response) {
        var id = request.params.id;

        User.find({id: id}, function(error, user) {
            if(error) console.log(error);

            User.findById(user[0]._id, function(error, user) {
                if(error) console.log(error);

                console.log('id: ' + user.id + ' email: ' + user.email);
            });
        });
    });

    // UPDATE, first fetch by id, after update user
    app.put('/api/user', function(request, response) {
        var body = request.body;

        User.find({id: body.id}, function(error, user) {
            User.findByIdAndUpdate(user[0]._id, body, function() {
                console.log('Updated successfully!');
            })
        });
    });

    // DELETE, first fetch by id, after delete user
    app.delete('/api/user', function(request, response) {
        var body = request.body;

        User.find({id: body.id}, function(error, user) {
            User.findByIdAndRemove(user[0]._id, body, function() {
                console.log('Deleted user '+ body.id + ' successfully!');
            })
        });
    });
}