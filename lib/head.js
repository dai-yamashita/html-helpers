var _ = require("lodash"),
    tag = require("./tag");

/**
 * The valid HTML5 DOCTYPE declaration
 */
exports.doctype = "<!DOCTYPE html>";

/**
 * Returns a `title` tag
 *
 * @param {String} title  The content for the tag itself
 * @return {String}
 */
exports.title = function (title) {
    return tag("title", title);
};

/**
 * Returns a name/content-pair meta tag
 *
 * @param {String} name     The meta key
 * @param {String} content  The meta value
 * @return {String}
 */
function meta(name, content) {
    return tag("meta", null, {
        name:    name,
        content: content
    });
}

meta.keywords    = _.partial(meta, "keywords");
meta.description = _.partial(meta, "description");

exports.meta = meta;

/**
 * Returns a meta charset tag
 *
 * @param {String} charset  The charset name (default: "utf-8")
 * @return {String}
 */
exports.charset = function (charset) {
    return tag("meta", null, { charset: charset || "utf-8" });
};
