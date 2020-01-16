var port = process.argv[3] || 1337;

var StaticServer = require('static-server');
var server = new StaticServer({
    rootPath: './public/',
    port: port
});

server.start(function () {
    console.log('Server listening to', server.port);
});
