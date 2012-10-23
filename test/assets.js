var html = require("../");

describe("assets", function () {
    describe(".js()", function () {
        it("should have 'script' as an alias", function () {
            html.js.should.equal(html.script);
        });

        it("should output a basic script tag", function () {
            html.js("jquery.js")
                .should.equal('<script src="jquery.js"></script>');
        });

        it("should render multiple tags if multiple args are passed", function () {
            html.js("jquery.js", "jquery-ui.js")
                .should.equal('<script src="jquery.js"></script>\n<script src="jquery-ui.js"></script>');
        });
    });

    describe(".css()", function () {
        it("should have 'stylesheet' as an alias", function () {
            html.css.should.equal(html.stylesheet);
        });

        it("should output a basic link tag", function () {
            html.css("main.css")
                .should.equal('<link href="main.css" rel="stylesheet">');
        });

        it("should render multiple tags if multiple args are passed", function () {
            html.css("a.css", "b.css")
                .should.equal('<link href="a.css" rel="stylesheet">\n<link href="b.css" rel="stylesheet">');
        });
    });
});
