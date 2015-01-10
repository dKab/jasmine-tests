describe("Функция bind(fn, context)", function() {
	var obj = { foo: 'baz'},
	binded, spy;
	window.foo  = 'bar';
	var checkContext = function() {
		return this.foo;
	}
	beforeEach(function() {	
		spy = jasmine.createSpy(checkContext);
		binded = bind(checkContext, obj);
	});

	it("должна возвращать фукнцию", function() {
		expect(binded).toEqual(jasmine.any(Function));
		});
		describe("Эта функция", function() {
			it("должна всегда вызывать фунцкцию fn с контекстом context", function() {
				expect(checkContext()).toEqual('bar');
				expect(binded()).toEqual('baz');
			});
			it("должна передавать свои агрументы функциии fn", function() {
				var bindedSpy =  bind(spy, obj);
				bindedSpy('a', 'b', 'c');
				bindedSpy('12345');
				bindedSpy(true);
				expect(spy.calls.allArgs()).toEqual(
					[['a', 'b', 'c'], ['12345'], [true]]);
			});
		});
});