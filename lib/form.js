var _ = require("lodash"),
    tag = require("./tag");

/**
 * Returns an opening `form` tag
 *
 * @param {String} action  The form action attribute
 * @param {Object} attr    Additional HTML attributes
 * @return {String}
 */
exports.begin = function (action, attr) {
    attr = attr || Object.create(null);
    attr.action = action;

    return tag.open("form", attr);
};

/**
 * Returns a closing `form` tag
 *
 * @return {String}
 */
exports.end = function () {
    return tag.close("form");
};

/**
 * Returns a `label` tag
 *
 * @param {String} text  The inner text of the label
 * @param {Object} attr  Additional HTML attributes
 * @return {String}
 */
exports.label = function (text, attr) {
    return tag("label", text, attr);
};

/**
 * Returns an `input` tag
 *
 * @param {String} name  The form element name
 * @param {String} type  The input type (ex. "checkbox", "radio", "text", etc)
 * @param {Object} attr  Additional HTML attributes
 * @return {String}
 */
exports.input = function (name, type, attr) {
    attr = attr || Object.create(null);
    attr.name = name;
    attr.type = type || "text";

    return tag("input", null, attr);
};

/**
 * Returns a `select` tag (with nested `option` and `optgroup` tags)
 *
 * If a "nested object" is detected within a key of the options param, it will
 * automatically create `optgroup`s to wrap those nested options.
 *
 * Additionally, it should be noted that the `selected` parameter uses `==` for
 * a looser comparison than strict equality (`===`)
 *
 * @param {String}       name      The form element name
 * @param {Object|Array} options   The options for the select
 * @param {Mixed}        selected  The value for the selected option (compared with ==)
 * @param {Object}       attr      Additional HTML attributes
 * @return {String}
 */
exports.select = function (name, options, selected, attr) {
    attr = attr || Object.create(null);

    attr.name = name;

    function htmlOptions(input) {
        return _.map(input, function (label, val, list) {
            var attr = { value: val };

            if (Array.isArray(list)) {
                delete attr.value;
                attr.selected = label === selected;
            } else {
                attr.selected = val == selected || label == selected;
            }

            if (typeof label === "object") {
                return tag("optgroup", htmlOptions(label), { label: val });
            } else {
                return tag("option", label, attr);
            }
        }).join("");
    }

    return tag("select", htmlOptions(options), attr);
};

/**
 * Returns a `textarea` input
 *
 * @param {String} name  The form element name
 * @param {String} val   The initial value for the textarea
 * @param {Object} attr  Additional HTML attributes
 * @return {String}
 */
exports.textarea = function (name, val, attr) {
    attr = attr || Object.create(null);

    attr.name = name;

    return tag("textarea", val || "", attr);
};

/**
 * Returns a `button` element
 *
 * @param {String} label  The content of the button tag
 * @param {Object} attr   Additional HTML attributes
 * @return {String}
 */
exports.button = function (label, attr) {
    attr = attr || Object.create(null);

    attr.type = attr.type || "button";

    return tag("button", label, attr);
};

/**
 * Creates helper functions for each of the existing input types available to HTML4/5
 */
_.each([
    // typical
    "checkbox", "file", "hidden", "password", "radio", "submit", "text",
    // html5
    "color", "date", "email", "number", "search", "tel", "url"
], function (type) {
    exports[type] = function (name, attr) {
        return exports.input(name, type, attr);
    };
});
