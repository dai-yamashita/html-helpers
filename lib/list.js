var _    = require("lodash"),
    util = require("./util"),
    tag  = require("./tag"),
    list;

/**
 * Helper for outputting a full list without all the intermediate steps
 *
 * Options:
 *  - attr.tag  The tag name for the list
 *
 * @param {Array} items  The list of items to add (each one is passed to list.item as a single object)
 * @param {Object} attr  Additional HTML attributes
 * @return {String}
 */
list = module.exports = function (items, attr) {
    attr = attr || Object.create(null);

    var output = [], tagName = attr.tag;

    output.push(list.begin(attr));
    output.push(_.map(items, function (item) {
        return list.item(item);
    }).join(""));
    output.push(list.end(tagName));

    return output.join("");
};

/**
 * Return the opening tag for a list
 *
 * Options:
 *  - attr.tag  The tag name (default: `ul`)
 *
 * @param {Object} attr  Additional options and/or HTML attributes
 * @return {String}
 */
list.begin = function (attr) {
    attr = attr || Object.create(null);

    var opts = util.extract(attr, [ "tag" ], { "tag": "ul" });

    return tag.open(opts.tag, attr);
};

/**
 * Return the closing tag for a list
 *
 * @param {String} tagName  The tag name (default: `ul`)
 * @return {String}
 */
list.end = function (tagName) {
    return tag.close(tagName || "ul");
};

/**
 * Return a list item tag
 *
 * Options:
 *  - attr.tag  The tag name (default: `li`)
 *
 * @param {String} label  The text of the label
 * @param {Object} attr   Additional options and/or HTML attributes
 * @return {String}
 */
list.item = function (label, attr) {
    if (typeof label === "object") {
        attr = label;
        label = attr.label;
        delete attr.label;
    }

    attr = attr || Object.create(null);

    var opts = util.extract(attr, [ "tag" ], { tag: "li" });

    return tag(opts.tag, label, attr);
};

/**
 * Wrapper for creating a `dt` tag
 *
 * @param {String} label  The text of the tag
 * @param {Object} attr   Additional HTML attributes
 * @return {String}
 */
list.term = function (label, attr) {
    attr = attr || Object.create(null);
    attr.tag = "dt";

    return list.item(label, attr);
};

/**
 * Wrapper for creating a `dd` tag
 *
 * @param {String} label  The text of the tag
 * @param {Object} attr   Additional HTML attributes
 * @return {String}
 */
list.definition = function (label, attr) {
    attr = attr || Object.create(null);
    attr.tag = "dd";

    return list.item(label, attr);
};
