var _    = require("lodash"),
    html = require("../");

describe(".table", function () {
    describe(".begin()", function () {
        it("should output a basic table open tag", function () {
            html.table.begin()
                .should.equal('<table>');
        });

        it("should add HTML attributes", function () {
            html.table.begin({ align: "center" })
                .should.equal('<table align="center">');
        });
    });

    describe(".end()", function () {
        it("should output a html closing tag", function () {
            html.table.end()
                .should.equal('</table>');
        });
    });

    _.each({
        thead: "head",
        tfoot: "foot",
        tr:    "row"
    }, function (method, tag) {
        describe("." + method + "()", function () {
            it("should output a basic " + tag + " open tag", function () {
                html.table[method]()
                    .should.equal(html.tag(tag, null));
            });

            it("should add HTML attributes", function () {
                var attr = { "class": "my-class" };

                html.table[method](attr)
                    .should.equal(html.tag(tag, null, attr));
            });
        });

        describe("." + method + "End()", function () {
            it("should output a basic " + tag + " closing tag", function () {
                html.table[method + "End"]()
                    .should.equal(html.tag.close(tag));
            });
        });
    });

    _.each({
        td: "data",
        th: "header"
    }, function (method, tag) {
        describe("." + method + "()", function () {
            it("should have an alias (" + tag + ")", function () {
                html.table[method].should.equal(html.table[tag]);
            });

            it("should render a basic " + tag + "opening tag", function () {
                var content = "Hello";

                html.table[method](content)
                    .should.equal(html.tag(tag, content));
            });

            it("should add HTML attributes", function () {
                var content = "Foo", attr = { "id": "my-id" };

                html.table[method](content, attr)
                    .should.equal(html.tag(tag, content, attr));
            });
        });
    });

    describe(".caption()", function () {
        it("should render a complete caption tag", function () {
            html.table.caption("Hello Screen Reader").should.equal("<caption>Hello Screen Reader</caption>");
        });
    });
});
