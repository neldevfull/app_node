var User = require('../models/user')();

module.exports = function(app) {

    // Renderiza index, exemplo com navegador
    app.get('/', function(request, response) {
        response.render('index');
    });

    // Salva o usuário (INSERT)
    app.post('/api/user/save', function(request, response) {
        var body = request.body;

        var newUser = new User(body);

        newUser.save(function(error, user) {
            if(error) {
                console.log("Error save user");
                throw error;
            }

            console.log("Save user" + user);
        });
    });

    // Busca todos os usuários (SELECT SEM WHERE)
    app.get('/api/user/all', function(request, response) {
        User.find({}, function(error, users) {
            if(error) {
                console.log("Error user all");
                console.log(error);
                throw error;
            }

            console.log("All users")
            users.forEach(function(user) {
                console.log("id: " + user.id + " email: " + user.email);
            });

        });
    });

    // SELECT WHERE POR ID
    app.get('/api/user/:id', function(request, response) {
        var id = request.params.id;

        User.find({id: id}, function(error, user) {
            if(error) console.log(error);

            User.findById(user[0]._id, function(error, user) {
                if(error) console.log(error);

                console.log("id: " + user.id + " email: " + user.email);
            });
        });
    });
}