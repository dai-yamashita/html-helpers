var _ = require("lodash"),
    tag = require("./tag");

/**
 * Returns a script tag pointing to an external script file
 *
 * @param {String} src  The src attribute
 * @return {String}
 */
exports.script = function (src) {
    if (arguments.length > 1) {
        return _.map(arguments, function (arg) {
            return exports.js(arg);
        }).join("\n");
    }

    return tag("script", "", { src: src });
};

exports.js = exports.script;

/**
 * Returns a link tag pointing to an external stylesheet
 */
exports.stylesheet = function (href) {
    if (arguments.length > 1) {
        return _.map(arguments, function (arg) {
            return exports.css(arg);
        }).join("\n");
    }

    return tag("link", null, {
        rel:  "stylesheet",
        href: href
    });
};

exports.css = exports.stylesheet;
