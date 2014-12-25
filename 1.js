describe("Generator", function() {
	var startingValue = 10,
			step = 3;
	var generator  = sequence(startingValue, step);
	it("should return another function", function() {
		expect(generator).toBeOfType("Function");
	});

	describe("that function", function () {
		beforeEach(function() {
			generator = sequence(startingValue, step);
		});
		it('on first invokation should return starting value', function () {
			expect(generator()).toEqual(startingValue);
		});
		it('from second invokation should return value incremented by step', function() {
			generator();
			expect(generator()).toEqual(startingValue+step);
			expect(generator()).toEqual(startingValue+step*2);
		});
	});
	describe("its parameters", function () {
		beforeEach(function() {
			generator2 = sequence();
		});
		
		it("all should be optional", function() {
			expect(generator2).toBeTruthy();
		});
		it("starting value should be 0 by default", function() {
			expect(generator2()).toBe(0);
		});
		it("step value should be 1 by default", function() {
			generator2();
			expect(generator2()).toBe(1);
			expect(generator2()).toBe(2);
		});
	});
	it("should be able to create any number of independent generators", function() {
		var generator = sequence();
		var generator2 = sequence();
		expect(generator).toBeTruthy();
		expect(generator2).toBeTruthy();
		expect(generator).not.toBe(generator2);
		generator();
		expect(generator()).not.toEqual(generator2());	
	});
});