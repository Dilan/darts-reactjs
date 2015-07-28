var port = process.argv[3] || 1337;
require('connect').
    createServer(require('connect').static('public')).
    listen(port, '127.0.0.1');
require('open')('http://127.0.0.1:' + port + '/index.html');
