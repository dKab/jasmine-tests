describe("Function 'take'", function() {
	var step = 2, base = 0, callCount = 3;
	var gen = sequence(base, step); 
	it("should return an array", function() {
		var res = take(gen, callCount);
		expect(res.constructor).toBe(Array);
	});
	it("should call function passed as first arg number of times passed as 2nd arg", function() {
		var realCallCount = 0;
		var tempObj = {
			foo: gen
		};
		spyOn(tempObj, 'foo');
		take(tempObj.foo, callCount);
		expect(tempObj.foo.calls.count()).toEqual(callCount);
	});
	describe("the array", function() {
		it("should contain sequence of results returned by the function", function() { 
			var rand = Math.random();
			var arr = [];
			for (var i = 0; i< callCount; i++) {
				arr[i] = rand;
			}
			var tempObj = {
				foo: gen
			};
            spyOn(tempObj, 'foo').and.returnValue(rand);
			var ret = take(tempObj.foo, callCount);
			expect(ret).toEqual(arr);
		});
	});
}); 