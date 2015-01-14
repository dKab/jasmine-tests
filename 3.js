describe("Функция map(fn, array)", function() {
	var curtime = new Date().getTime().toString(),
		rand  = Math.random(),
		orig, res, tmpObj, remember;
	var mutate = function(obj) {
		obj[curtime] = rand;
		return obj;
	};

	beforeEach(function() {
		tmpObj  = {
			spy: mutate
		};
		orig = [{}, {}, {}, {}];
		remember = orig.slice(0);
		spyOn(tmpObj, 'spy').and.callThrough();
		res = map(tmpObj.spy, orig);
	});
	it("должна возвращать массив", function() {

		expect(res).toEqual(jasmine.any(Array));
	});
	it("должна вызывать функцию fn для всех элементов массива array", function() {	
		expect(tmpObj.spy.calls.count()).toEqual(orig.length);
		expect(res.length).toEqual(orig.length);
		for (var i = 0; i < res.length; i++) {
			expect(res[i][curtime]).toBeDefined();
			expect(res[i][curtime]).toEqual(rand);
		}
	});
	it("Не должна изменять переданный ей массив", function() {
		expect(orig).toEqual(remember);
	});
});
