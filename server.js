const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

// creating the hapi server instance
var server = new Hapi.Server();

// adding a new connection that can be listened on
server.connection({
  port: process.env.PORT || 3000,
  host: '0.0.0.0',
  labels: ['web']
});

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: './public',
            index: '/index.html'
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});