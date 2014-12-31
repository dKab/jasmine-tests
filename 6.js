describe("Функция partialAny(fn, foo, bar...)", function() {
	function test(a, b, c) { return { a: a, b: b, c: c};}
	var test5_10 = partialAny(test, 5, undefined, 10);
	function test2(a, b, c, d, e, f) {
		return {a: a, b: b, c:c, d:d, e:e, f:f};
	}
	_test2 = partialAny(test2, undefined, 1, undefined, 2, undefined, 4);
	it("должна испольльзовать строгое сравнение с undefined", function() {
		var testNull = partialAny(test2, undefined, 1, null, 2, undefined, 4);
		var res = testNull(5, 10, 15);
		expect(res.c).toBe(null);
	});
	it("дожна возвращать функцию", function() {
		expect(test5_10).toEqual(jasmine.any(Function));
	});
	describe("Возвращаемая функция", function() {
		it("должна вызывать функцию fn с аргументами foo, bar и т.д.", function() {
			var res = test5_10(7),
			 res2 = test5_10(),
			  res3 = _test2(),
			  res4  = _test2(1, 3, 9);
			expect(res.b).toEqual(7);
			expect(res2).toEqual({a: 5, b: undefined, c: 10});
			expect(res3).toEqual({a: undefined, b: 1, c:undefined, d: 2, e: undefined, f: 4});
			expect(res4).toEqual({a: 1, b: 1, c: 3, d:2, e:9, f: 4});
		});
	});
});