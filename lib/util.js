var _ = require("lodash");

/**
 * A nice way of extracting configuration options out of an object, and even
 * setting default values.
 *
 * This is used internally to allow for the `attr` parameter to contain keys
 * that are not meant to be HTML attributes, but instead alter the output of
 * the helper in some way.
 *
 * Usage:
 *     var attr = {
 *         tag: "section",
 *         id:  "my-id"
 *     };
 *
 *     // extract the 'tag' option from attr, using "div" as it's default
 *     var options = extract(attr, [ "tag" ], { tag: "div" });
 *
 *     // options: { id:  "my-id" }
 *     // attr:    { tag: "section" }
 *
 * @param {Object} input   The input object (to be extracted from)
 * @param {Array}  keys    The keys to extract from input
 * @param {Object} output  If supplied, will become the object that receives the
 *                         extracted keys (consequently, values not found in the
 *                         input will just used the defaults in output)
 * @return {String}
 */
exports.extract = function (input, keys, output) {
    output = output || {};

    if (!input || !keys) return output;

    _.each(keys, function (key) {
        if (key in input) {
            output[key] = input[key];
            delete input[key];
        }
    });

    return output;
};
