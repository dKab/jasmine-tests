describe("Функция partial(fn, foo, bar...)", function() {
		var doSmthg = function(a, b, c, d) {
			return [a, b, c, d];
		},
		add = function(a, b) { return a + b; },
		mult = function(a, b, c, d) { return a * b * c * d; },
		newFn,
		spy;

		function returnArgs() {
			return Array.prototype.slice.call(arguments);
		}

		beforeEach(function() {
			spy = jasmine.createSpy(function() { });
			var partialSpy = partial(spy,"baz", "qux");
			var partialSpy2 = partial(spy, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
			partialSpy();
			partialSpy2();

			newFn = partial(doSmthg, "a", "b");
		});

	it("должна возвращать другую функцию", function() {
		expect(newFn).toBeOfType("Function");
		expect(newFn).toEqual(jasmine.any(Function));
	});

	it("должна привязывать переданные ей аргументы к первым параметрам функции fn", function() {
			expect(partial(returnArgs, 1, 2)()).toEqual([1, 2]);
			expect(spy).toHaveBeenCalled();
			expect(spy.calls.argsFor(0)).toEqual(["baz", "qux"]);
			expect(spy.calls.argsFor(1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
	});

	describe("Возвращаемая функция", function() {
		it("должна возвращать результаты вызова функции fn с аргументами foo, bar...", function() {
			expect(newFn('c', 'd')).toEqual(['a', 'b', 'c', 'd']);
			expect(partial(mult, 10, 2)(0.1, 0.5)).toEqual(1);
			expect(partial(add, 15)(-15)).toBe(0);
			expect(partial(returnArgs)(1)).toEqual([1]);
		});

		it("может вызываться многократно и результаты одного вызова не влияют на другой", function () {
			var fn = partial(returnArgs, 1);
			fn(2, 3);
			expect(fn(4)).toEqual([1, 4]);
			expect(fn()).toEqual([1]);
		});
	});
});
