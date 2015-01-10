describe("Функция take(gen, n)", function() { 
	var callCount, spy; 
	beforeEach(function() {
		callCount = 5;
		spy = jasmine.createSpy(function() { });
	});

	it("должна возвращать массив", function() {
		var res = take(function() { }, callCount);
		expect(res).toBeOfType("Array");
		expect(res).toEqual(jasmine.any(Array));
	});
	it("должна вызывать функцию gen n раз", function() {
		take(spy, callCount);
		expect(spy.calls.count()).toEqual(callCount);
	});
	describe("Возвращаемый массив", function() {
		it("должен содержать последовательность результатов вызовов функции gen", function() { 
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
