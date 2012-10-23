var _ = require("lodash");

// modules that directly extend the HTML namespace
_.extend(exports,
    require("./util"),
    require("./head"),
    require("./assets")
);

// modules that create their own namespace
_.each([
    "form",
    "list",
    "table",
    "tag",
    "util"
], function (mod) {
    exports[mod] = require("./" + mod);
});
