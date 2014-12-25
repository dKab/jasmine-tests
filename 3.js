describe("Function map(fn, array)", function() {
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
	
	it("should return an array", function() {
		expect(res).toBeOfType("Array");
	});
	it("should apply function passed as 1st arg to each element of array passed as 2nd arg", function() {	
		expect(tmpObj.spy.calls.count()).toEqual(orig.length);
		expect(res.length).toEqual(orig.length);
		for (var i = 0; i < res.length; i++) {
			expect(res[i][curtime]).toBeDefined();
			expect(res[i][curtime]).toEqual(rand);
		}
	});
	it("should not change original array", function() {
		expect(orig).toEqual(remember);
	});
});