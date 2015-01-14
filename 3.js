describe("Функция map(fn, array)", function() {
	var curtime = new Date().getTime().toString(),
		rand  = Math.random(),
		orig, res, tmpObj, remember;
	var mutate = function(obj) {
		obj[curtime] = rand;
		return obj;
	};

	function processValue(x) {
		return x * 3;
	}

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

	it("должна возвращать массив, содержащий обработанные функцией значения", function () {
		var source = [1, 2, 3];
		var result = map(processValue, source);
		expect(result).toEqual([3, 6, 9]);
	});

	it("не должна изменять переданный ей массив", function() {		
		var source = [1, 2, 3], 
			sourceCopy = source.slice();			
		var result = map(processValue, source);
		expect(source).toEqual(sourceCopy);
	});
});
