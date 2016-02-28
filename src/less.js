var getPath = require('./get-path').getPath;
var pathTools = require('path');
var fs = require('fs');
var less = require('less');

module.exports = function(req, res, next) {
    var path = getPath(req.url, ".css");

    if (!path) {
        next();
        return;
    }

    path = path.replace(/.css$/, ".less");

    try {
        less.render(fs.readFileSync(path, {encoding: "utf8"}), {
            paths: [pathTools.dirname(path)],
            filename: pathTools.basename(path),
            sourceMap: {sourceMapFileInline: true}
        }, function(error, output) {
            if (error) {
                res.writeHead(500, {"content-type": "text/plain"});
                res.end(error);
                return;
            }

            res.writeHead(200, {"content-type": "stylesheet/css"});
            res.end(output.css);
        });

        console.log("Less", path);
    } catch(e) {
        next();
    }
};
