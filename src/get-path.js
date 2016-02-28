var urlTools = require('url');
var pathTools = require("path");
var basePath;

exports.setBase = function(path) {
    basePath = path;
};

exports.getPath = function(url, ext) {
    var path = pathTools.join(basePath, urlTools.parse(url).pathname);

    var info = pathTools.parse(path);
    if (info.ext !== ext) {
        return false;
    }

    return path;
};
