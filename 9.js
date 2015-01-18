describe('Функция filter(fn, arr)', function() {
	it('должна возвращать массив значений для которых fn вернет true', function() {
		var arr = [0, -1, 5, -7, 6, 100, -10],
		isNegative = function (val) { return val < 0; },
		res = filter(isNegative, arr);
		expect(res).toEqual([-1, -7, -10]);
	});
	it('не должна изменять исходный массив', function() {
		var arr = ['foo', 'bar', 'Baz', 'quax'],
			copy = arr.slice(),
			startsWithB = function(str) { return str.indexOf('b') === 0; };
			filter(startsWithB, arr);
			expect(arr).toEqual(copy);
	});
});