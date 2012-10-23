var html = require("../");

describe(".list()", function () {
    it("should return a full list", function () {
        html.list([ "A", "B", "C" ])
            .should.equal('<ul><li>A</li><li>B</li><li>C</li></ul>')
    });

    it("should return a <ol> list", function () {
        html.list([ { label: "G" } ], { tag: "ol" })
            .should.equal('<ol><li>G</li></ol>');
    });

    it("should include additional HTML attributes on the root", function () {
        html.list([ 1, 2, 3 ], { id: "numbers" })
            .should.equal('<ul id="numbers"><li>1</li><li>2</li><li>3</li></ul>');
    });

    it("should inculde additional HTML attributes on the items", function () {
        html.list([ { label: "G", id: "foo" } ])
            .should.equal('<ul><li id="foo">G</li></ul>');
    });

    describe(".begin()", function () {
        it("should return a ul opening tag", function () {
            html.list.begin().should.equal('<ul>');
        });

        it("should allow the tag to be overridden", function () {
            html.list.begin({ tag: "ol" }).should.equal('<ol>');
        });

        it("should include additional HTML attributes", function () {
            html.list.begin({ id: "my-nav" })
                .should.equal('<ul id="my-nav">');
        });
    });

    describe(".end()", function () {
        it("should return a closing ul tag", function () {
            html.list.end().should.equal('</ul>');
        });

        it("should allow the tag to be overridden", function () {
            html.list.end("ol").should.equal('</ol>');
        });
    });

    describe(".item()", function () {
        it("should return a basic <li>", function () {
            html.list.item("Home").should.equal('<li>Home</li>');
        });

        it("should include additional HTML attributes", function () {
            html.list.item("Home", { id: "my-item" })
                .should.equal('<li id="my-item">Home</li>');
        });

        it("should accept only a single hash as the arguments", function () {
            html.list.item({ label: "Test" }).should.equal('<li>Test</li>');
        });
    });

    describe(".term()", function () {
        it("should return a <dt>", function () {
            html.list.term("Test").should.equal('<dt>Test</dt>');
        });

        it("should include additional HTML attributes", function () {
            html.list.term("Hello", { id: "my-term" })
                .should.equal('<dt id="my-term">Hello</dt>');
        });
    });

    describe(".definition()", function () {
        it("should return a <dd>", function () {
            html.list.definition("Test").should.equal('<dd>Test</dd>');
        });

        it("should include additional HTML attributes", function () {
            html.list.definition("Hello", { id: "my-def" })
                .should.equal('<dd id="my-def">Hello</dd>');
        });
    });
});
