var html = require("../");

describe(".tag()", function () {
    it("should return a complete tag normally", function () {
        html.tag("i", "").should.equal("<i></i>");
        html.tag("b", "Bold Text").should.equal("<b>Bold Text</b>");
    });

    it("should return only an opening tag when content is null or undefined", function () {
        html.tag("div").should.equal("<div>");
        html.tag("link", undefined).should.equal("<link>");
        html.tag("form", null).should.equal("<form>");
    });

    it("should include attributes if an objet is provided", function () {
        html.tag("form", null, { action: "/some-url", method: "post" })
            .should.equal('<form action="/some-url" method="post">');

        html.tag("td", "Data", { colspan: 2 })
            .should.equal('<td colspan="2">Data</td>');
    });

    describe(".open()", function () {
        it("should only return an open tag", function () {
            html.tag.open("div").should.equal("<div>");
            html.tag.open("button", { type: "button" }).should.equal('<button type="button">');
        });
    });

    describe(".close()", function () {
        it("should only return a closing tag", function () {
            html.tag.close("html").should.equal("</html>");
            html.tag.close("body").should.equal("</body>");
        });
    });

    describe(".attributes()", function () {
        it("should return an empty string when given no arguments, or an empty object", function () {
            html.tag.attributes().should.equal("");
            html.tag.attributes({}).should.equal("");
        });

        it("should return a string of html attributes when an object is passed", function () {
            html.tag.attributes({ name: "foo", title: "test" })
                .should.equal('name="foo" title="test"');
        });

        it("should treat numbers like strings", function () {
            html.tag.attributes({ colspan: 5, rowspan: 2 })
                .should.equal('colspan="5" rowspan="2"');
        });

        it("should treat booleans like flags (true: key only, false: no attr)", function () {
            html.tag.attributes({ disabled: true, name: "foo", readonly: false })
                .should.equal('disabled name="foo"');
        });

        it("should ignore null and undefined values", function () {
            html.tag.attributes({ foo: null, bar: undefined })
                .should.equal("");
        });
    });
});
