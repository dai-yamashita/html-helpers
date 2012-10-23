var _ = require("lodash");

/**
 * Return a string for a formed HTML5 attribute
 *
 * Different data types are handled:
 *  - `boolean` &mdash; If `true`, only the key name will be output (it's a flag attribute like `required`)
 *  - `undefined|null` &mdash; Nothing will be output
 *  - `string|number` &mdash; Normal behavior (`key="value"`)
 *
 * @param {String} key  The attribute name
 * @param {Mixed}  val  The attribute value
 */
function attribute(key, val) {
    if (typeof val === "boolean") {
        return !!val ? key : null;
    } else if (val === undefined || val === null) {
        return null;
    } else {
        return [key, '"' + val + '"'].join("=");
    }
}

/**
 * Returns a complete list of HTML attributes (from a collection)
 *
 * **Note:** The attribute names are sorted by name alphabetically, to make unit tests easier
 * to write and make the output easier to check for accuracy.
 *
 * @param {Object} list  The key/value pairs of HTML attributes
 */
function attributes(list) {
    return _.chain(list)
        .map(function (val, key) {
            return attribute(key, val);
        })
        .without(null)
        .value().sort().join(" ");
}

/**
 * Returns an opening tag for a given element
 *
 * @param {String} tag   The tag name
 * @param {Object} attr  The HTML attributes
 */
function open(tag, attr) {
    var output = "<" + tag,
        attrStr = _.size(attr) && attributes(attr);

    if (attr && attrStr) {
        output += " " + attrStr;
    }

    return output + ">";
}

/**
 * Returns a closing tag for a given element
 */
function close(tag) {
    return "</" + tag + ">";
}

/**
 * Returns a complete tag depending on input
 *
 * **Note:** a `content` value of `undefined` or `null` will only return the opening tag
 *
 * @param {String} tag      The tag name
 * @param {Mixed}  content  The HTML content for the tag (not escaped)
 * @param {Object} attr     HTML attributes
 */
function render(tag, content, attr) {
    var output = open(tag, attr);

    if (content === null || content === undefined) {
        return output;
    } else {
        return output + content + close(tag);
    }
}

/**
 * The "render" function is the export, and the internal helpers will be added
 * to it's "namespace" for the convenience of the API
 */
render.attributes = attributes;
render.open = open;
render.close = close;

module.exports = render;
