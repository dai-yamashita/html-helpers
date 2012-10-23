var html = require("../");

describe("head", function () {
    describe(".doctype", function () {
        it("should be valid HTML5", function () {
            html.doctype.should.equal("<!DOCTYPE html>");
        });
    });

    describe(".title()", function () {
        it("should create a valid title tag", function () {
            html.title("Hello World").should.equal("<title>Hello World</title>");
        });
    });

    describe(".meta()", function () {
        it("should output a basic name/content meta tag", function () {
            html.meta("foo", "bar").should.equal('<meta content="bar" name="foo">');
        });

        describe(".keywords()", function () {
            it("should output a meta tag with keywords as the content", function () {
                html.meta.keywords("a, b, c").should.equal('<meta content="a, b, c" name="keywords">');
            });
        });

        describe(".description()", function () {
            it("should output a meta tag with description as the content", function () {
                html.meta.description("hello world").should.equal('<meta content="hello world" name="description">');
            });
        });
    });

    describe(".charset()", function () {
        it("should output a simple HTML5 charset meta tag", function () {
            html.charset("iso-8859-1").should.equal('<meta charset="iso-8859-1">');
        });

        it("should default to utf-8", function () {
            html.charset().should.equal('<meta charset="utf-8">');
        });
    });
});
