var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'home': 'home',
        'about': 'about',
        'users': 'users',
        'page/:id': 'page'
    },

    home: function() {
        var template = Handlebars.compile($("#homeTemplate").html());
        $('#content').html(template({
            name: 'Ella'
        }));
    },
    
    about: function() {
        var template = Handlebars.compile($("#aboutTemplate").html());
        $('#content').html(template({
            name: 'Ava'
        }));
    },
    
    users: function() {
        $.ajax({
            url: 'http://localhost:3000/users',
            type: 'GET'
        }).done(function(response) {
            var template = Handlebars.compile($("#usersTemplate").html());
            $('#content').html(template({
                users: response
            }));
        });
    },
    
    page: function(id) {
        console.log(id);
    }
});

var router = new Router();

Backbone.history.start();