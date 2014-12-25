describe("Function 'take'", function() { 
	var callCount, spy; 
	beforeEach(function() {
		callCount = 5;
		spy = jasmine.createSpy(function() { });
	});

	it("should return an array", function() {
		var res = take(function() { }, callCount);
		expect(res).toBeOfType("Array");
	});
	it("should call function passed as first arg number of times passed as 2nd arg", function() {
		take(spy, callCount);
		expect(spy.calls.count()).toEqual(callCount);
	});
	describe("the array", function() {
		it("should contain sequence of results returned by the function", function() { 
			var rand = Math.random();
			var arr = [];
			for (var i = 0; i< callCount; i++) {
				arr[i] = rand;
			}
			var tempObj = {
				foo: function() { }
			};
            spyOn(tempObj, 'foo').and.returnValue(rand);
			var ret = take(tempObj.foo, callCount);
			expect(ret).toEqual(arr);
		});
	});
}); 