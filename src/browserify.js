var getPath = require('./get-path').getPath;
var browserify = require('browserify');

module.exports = function(req, res, next) {
    var path = getPath(req.url, ".js");

    if (!path) {
        next();
        return;
    }

    console.log("Browserify", path);

    var data = browserify([path], {
        debug: true,
        detectGlobals: false,
        commondir: false
    });

    data.bundle(function(err, buff) {
        if (err) {
            res.writeHead(500, "content-type", "text/plain");
            res.end(err.message + "\n" + err.stack);
            return;
        }

        res.writeHead(200, "content-type", "application/javascript");
        res.end(buff);
    });
};
