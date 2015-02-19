describe("Функция partialAny(fn, foo, bar...)", function() {
	function test(a, b, c) { return { a: a, b: b, c: c};}
	var test5_10 = partialAny(test, 5, undefined, 10);
	function test2(a, b, c, d, e, f) {
		return {a: a, b: b, c:c, d:d, e:e, f:f};
	}
	var _test2 = partialAny(test2, undefined, 1, undefined, 2, undefined, 4);

	it("дожна возвращать функцию", function() {
		expect(test5_10).toEqual(jasmine.any(Function));
	});
	
	it("должна использовать строгое сравнение с undefined (null или 0 не должен восприниматься как undefined)", function() {
		var testNull = partialAny(test2, 0, 1, null, 2, undefined, 4);
		var res = testNull(5, 10, 15);
		expect(res.a).toBe(0);
		expect(res.c).toBe(null);
	});

	describe("Возвращаемая функция", function() {
		it("должна подставлять переданный аргумент в partialAny(fn, 5, undefined, 10)", function () {
			expect(test5_10(7).b).toEqual(7);
		});

		it("должна подставлять undefined если аргумент не передан в partialAny(fn, 5, undefined, 10)", function () {
			expect(test5_10()).toEqual({a: 5, b: undefined, c: 10});
		});

		it("должна подставлять несколько аргументов в partialAny(fn, a, undefined, undefined, b)", function () {
			expect(_test2(7, 3, 9)).toEqual({a: 7, b: 1, c: 3, d:2, e:9, f: 4});
		});

		it("должна подставлять undefined если аргумент не передан в partialAny(fn, a, undefined, undefined, b)", function () {
			expect(_test2(7)).toEqual({a: 7, b: 1, c: undefined, d:2, e:undefined, f: 4});
		});
	});
});