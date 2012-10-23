var html = require("..");

describe("util", function () {
    describe(".extract()", function () {
        it("should return an empty object if either no input or no keys are passed", function () {
            html.util.extract().should.eql({});
            html.util.extract({}).should.eql({});
            html.util.extract(null, []).should.eql({});
        });

        it("should delete the specified keys from input and they shuold be moved to output", function () {
            var input  = { a: "A", b: "B" },
                output = html.util.extract(input, [ "a" ]);

            input.should.eql({ b: "B" });
            output.should.eql({ a: "A" });
        });

        it("should accept a 3rd param as an alternate output (for setting defaults)", function () {
            var input  = { a: "A", b: "B" },
                output = { c: "C", d: "D" };

            html.util.extract(input, [ "a", "b" ], output);

            input.should.eql({});
            output.should.eql({ a: "A", b: "B", c: "C", d: "D" });
        });
    });
});
