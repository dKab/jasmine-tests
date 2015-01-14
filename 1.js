describe("Функция sequence(startingValue, step)", function() {
	var startingValue = 10,
			step = 3;
	var generator  = sequence(startingValue, step);
	it("должна возвращать другую функцию", function() {
		expect(generator).toBeOfType("Function");
		expect(generator).toEqual(jasmine.any(Function));
	});

	describe("Эта функция", function () {
		beforeEach(function() {
			generator = sequence(startingValue, step);
		});
		it('при первом вызове должна возврщать начальное значение', function () {
			expect(generator()).toEqual(startingValue);
		});
		it('при последующих вызовах должна возвращать значение, увеличенное на величину шага', function() {
			generator();
			expect(generator()).toEqual(startingValue+step);
			expect(generator()).toEqual(startingValue+step*2);
		});
	});
	describe("Её параметры", function () {
		beforeEach(function() {
			generator2 = sequence();
		});
		
		it("должны быть необязательными", function() {
			expect(generator2).toBeTruthy();
		});
		it("начальное значение должно быть равно 0 по умолчанию", function() {
			expect(generator2()).toBe(0);
		});
		it("шаг должнен быть 1 по умолчанию", function() {
			var g = sequence(4);
			expect(g()).toBe(4);
			expect(g()).toBe(5);
		});
	});
	it("можно создать любое количество независимых генераторов", function() {
		var generator = sequence();
		var generator2 = sequence();
		expect(generator).toBeTruthy();
		expect(generator2).toBeTruthy();
		expect(generator).not.toBe(generator2);
		generator();
		expect(generator()).not.toEqual(generator2());	
	});
});
