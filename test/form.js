var _    = require("lodash"),
    html = require("../");

describe(".form", function () {
    describe(".begin()", function () {
        it("should accept an action as the only required argument", function () {
            html.form.begin("/some-url")
                .should.equal('<form action="/some-url">');
        });

        it("should accept other HTML attributes", function () {
            html.form.begin("/login", { method: "post" })
                .should.equal('<form action="/login" method="post">');
        });
    });

    describe(".end()", function () {
        it("should return a closing form tag", function () {
            html.form.end().should.equal('</form>');
        });
    });

    describe(".label()", function () {
        it("should take content as the only required argument", function () {
            html.form.label("User").should.equal('<label>User</label>');
        });

        it("should take additional HTML attributes as the second (optional) argument", function () {
            html.form.label("Do you agree?", { "for": "agree", "class": "my-class" })
                .should.equal('<label class="my-class" for="agree">Do you agree?</label>');
        });
    });

    describe(".input()", function () {
        it("should take 'name' as the first argument, the 2nd arg (type) should default to text", function () {
            html.form.input("user")
                .should.equal('<input name="user" type="text">');
        });

        it("should change type if passed as the 2nd arg", function () {
            html.form.input("pass", "password")
                .should.equal('<input name="pass" type="password">');
        });

        it("should add attributes if an object is passed as the 3rd arg", function () {
            html.form.input("query", "search", { maxlength: 50, "class": "input-search" })
                .should.equal('<input class="input-search" maxlength="50" name="query" type="search">');
        });
    });

    describe(".select()", function () {
        it("should take name and options as the first 2 args", function () {
            html.form.select("test", { a: "A", b: "B" })
                .should.equal('<select name="test"><option value="a">A</option><option value="b">B</option></select>');
        });

        it("should take selected as the 3rd arg", function () {
            html.form.select("test", { a: "A", b: "B" }, "b")
                .should.equal('<select name="test"><option value="a">A</option><option selected value="b">B</option></select>');
        });

        it("should also attempt to match the label, not just the value", function () {
            html.form.select("test", { a: "A", b: "B" }, "A")
                .should.equal('<select name="test"><option selected value="a">A</option><option value="b">B</option></select>');
        });

        it("should accept an array as the list of options", function () {
            html.form.select("test", ["a", "b", "c"])
                .should.equal('<select name="test"><option>a</option><option>b</option><option>c</option></select>');
        });

        it("should group options if multiple layers are detected", function () {
            html.form.select("test", { lowercase: [ "a", "b" ], uppercase: [ "A", "B" ] }, "A")
                .should.equal('<select name="test"><optgroup label="lowercase"><option>a</option><option>b</option></optgroup><optgroup label="uppercase"><option selected>A</option><option>B</option></optgroup></select>');
        });

        it("should group options if nested objects are detected", function () {
            html.form.select("test", { alpha: { a: "A", b: "B" }, numeric: [ 1, 2 ] }, 2)
                .should.equal('<select name="test"><optgroup label="alpha"><option value="a">A</option><option value="b">B</option></optgroup><optgroup label="numeric"><option>1</option><option selected>2</option></optgroup></select>');
        });
    });

    describe(".textarea()", function () {
        it("should work without arguments", function () {
            html.form.textarea().should.equal('<textarea></textarea>');
        });

        it("should take a name as a first arg", function () {
            html.form.textarea("test").should.equal('<textarea name="test"></textarea>');
        });

        it("should take a current value as the 2nd arg", function () {
            html.form.textarea("test", "My default value")
                .should.equal('<textarea name="test">My default value</textarea>');
        });

        it("should take additional attributes as the 3rd arg", function () {
            html.form.textarea("test", null, { rows: 5, cols: 30 })
                .should.equal('<textarea cols="30" name="test" rows="5"></textarea>');
        });
    });

    describe(".button()", function () {
        it("should accept a label as the first param", function () {
            html.form.button("Log In").should.equal('<button type="button">Log In</button>');
        });

        it("should accept additional attributes as the 2nd param", function () {
            html.form.button("Reset", { type: "reset", "class": "btn" })
                .should.equal('<button class="btn" type="reset">Reset</button>');
        });
    });

    describe("input types", function () {
        _.each([
            "checkbox", "file", "hidden", "password", "radio", "submit",
            "color", "date", "email", "number", "search", "tel", "url"
        ], function (type) {
            var fn = html.form[type];

            describe("." + type + "()", function () {
                it("should form without arguments", function () {
                    fn().should.equal('<input type="' + type + '">');
                });

                it("should take a name as the first argument", function () {
                    fn("test").should.equal('<input name="test" type="' + type + '">');
                });

                it("should take additional attributes as the second (optional) argument", function () {
                    fn("test", { "class": "my-class", placeholder: "enter value" })
                        .should.equal('<input class="my-class" name="test" placeholder="enter value" type="' + type + '">');
                });
            });
        });
    });
});
