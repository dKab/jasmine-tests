describe("Function partial(fn, foo, bar...)", function() {
		var doSmthg = function(a, b, c, d) {
			return [a, b, c, d];
		},
		add = function(a, b) { return a + b; },
		mult = function(a, b, c, d) { return a * b * c * d},
		newFn = partial(doSmthg, "a", "b"),
		mult_10_2 = partial(mult, 10, 2),
		add_15 = partial(add, 15),
		spy;
		beforeEach(function() {
			spy = jasmine.createSpy(function() { });
			var partialSpy = partial(spy,"baz", "qux");
			var partialSpy2 = partial(spy, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
			partialSpy();
			partialSpy2();
		});

	it("should return another function", function() {
		expect(newFn).toBeOfType("Function");
		expect(newFn).toEqual(jasmine.any(Function));
	});
	it("should bind its arguments to first params of returned function", function() {
			expect(spy).toHaveBeenCalled();
			expect(spy.calls.argsFor(0)).toEqual(["baz", "qux"]);
			expect(spy.calls.argsFor(1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
		});
	describe("the returned function", function() {

		it("should return results of calling fn with foo as first arg, bar as second arg, etc.", function() {
			expect(newFn('c', 'd')).toEqual(['a', 'b', 'c', 'd']);
			expect(mult_10_2(0.1, 0.5)).toEqual(1);
			expect(add_15(-15)).toBe(0);
		});
	});
});