var basePath = process.cwd();

require('./src/get-path').setBase(basePath);
var port = process.argv[2] || 80;

var http = require("http");
var connect = require('connect');

var serveStatic = require('serve-static');
var browserify = require('./src/browserify');
var less = require('./src/less');

var server = connect();

server.use("/less", serveStatic(__dirname + "/node_modules/less/dist"));

server.use(browserify);
server.use(less);

server.use(serveStatic(basePath, {index: "index.html"}));

http.createServer(server).listen(port);
