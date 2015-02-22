describe("Функция partialAny(fn, foo, bar...)", function() {
	function test(a, b, c) { return { a: a, b: b, c: c};}

	function test2(a, b, c, d, e, f) {
		return {a: a, b: b, c:c, d:d, e:e, f:f};
	}

	function returnArgs() {
		return Array.prototype.slice.call(arguments);
	}

	it("дожна возвращать функцию", function() {
		expect(partialAny(test)).toEqual(jasmine.any(Function));
	});
	
	it("должна использовать строгое сравнение с undefined (null или 0 не должен восприниматься как undefined)", function() {
		var testNull = partialAny(test2, 0, 1, null, 2, undefined, 4);
		var res = testNull(5, 10, 15);
		expect(res.a).toBe(0);
		expect(res.c).toBe(null);
	});

	describe("Возвращаемая функция", function() {

		var test5_10, _test2;
		beforeEach(function () {
			test5_10 = partialAny(test, 5, undefined, 10);
			_test2 = partialAny(test2, undefined, 1, undefined, 2, undefined, 4);
		});

		it("должна подставлять переданный аргумент вместо undefined: partialAny(fn, 5, undefined, 10)(1) -> [5, 1, 10]", function () {
			expect(test5_10(7)).toEqual({a: 5, b: 7, c: 10});
		});

		it("должна оставлять undefined если аргумент не передан: partialAny(fn, 5, undefined, 10)() -> [5, undefined, 10]", function () {
			expect(test5_10()).toEqual({a: 5, b: undefined, c: 10});
		});

		it("должна подставлять лишние аргументы в конец списка: partialAny(fn, 1)(2, 3) -> [1, 2, 3]", function () {
			expect(partialAny(returnArgs, 1)(2, 3)).toEqual([1, 2, 3]);
		});

		it("может вызываться несколько раз и результаты во второй раз не зависят от первого", function () {
			var fn = partialAny(returnArgs, undefined);
			fn(1);
			expect(fn())[0].toNotEqual(1);
		});

		it("должна подставлять несколько аргументов в partialAny(fn, a, undefined, undefined, b)", function () {
			expect(_test2(7, 3, 9)).toEqual({a: 7, b: 1, c: 3, d:2, e:9, f: 4});
		});

		it("должна подставлять undefined если аргумент не передан в partialAny(fn, a, undefined, undefined, b)", function () {
			expect(_test2(7)).toEqual({a: 7, b: 1, c: undefined, d:2, e:undefined, f: 4});
		});
	});
});