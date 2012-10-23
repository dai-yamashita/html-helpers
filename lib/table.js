var _   = require("lodash"),
    tag = require("./tag");

/**
 * Output an opening `table` tag
 *
 * @param {Object} attr  Additional HTML attributes
 * @return {String}
 */
exports.begin = function (attr) {
    return tag.open("table", attr);
};

/**
 * Output a clasing `table` tag
 *
 * @return {String}
 */
exports.end = function () {
    return tag.close("table");
};

// Create begin/end wrappers for each name/tag combo
_.each({
    thead: "head",
    tfoot: "foot",
    tbody: "body",
    tr:    "row"
}, function (method, tagName) {
    exports[method] = function (attr) {
        return tag.open(tagName, attr);
    };

    exports[method + "End"] = function () {
        return tag.close(tagName);
    };
});

// Create wrapper for each name/tag combo
_.each({
    td:      "data",
    th:      "header",
    caption: "caption"
}, function (method, tagName) {
    exports[tagName] = exports[method] = function (content, attr) {
        return tag(tagName, content, attr);
    };
});
