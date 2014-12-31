describe("function fmap(mixin, fn)", function() {
	var foo = {
		mixin: function() {},
		fn: function() {}
	}, bar, baz;

	beforeEach(function() {
	  baz = {};
	  spyOn(foo, 'fn').and.callFake(function(qux) {
	  	return qux;
	  });
	  spyOn(foo, 'mixin').and.returnValue(baz);
	  bar = fmap(foo.mixin, foo.fn);
	});

	it("should return new function", function() {
	    expect(bar).toBeOfType("Function");
		expect(bar).toEqual(jasmine.any(Function));
	});

	describe("the returned function", function() {
	    it("should be able to accept any number of arguments and must pass them as arguments to fn function", function() {
	    	var rand = Math.random();
	    	bar(rand);
	    	var rand2 = Math.random();
	    	bar(rand, rand2);
	    	bar(rand, rand2, false, true, 'quux');
	    	expect(foo.fn.calls.argsFor(0)).toEqual([rand]);
	    	expect(foo.fn.calls.argsFor(1)).toEqual([rand, rand2]);
	    	expect(foo.fn.calls.argsFor(2)).toEqual([rand, rand2, false, true, 'quux']);
	    });
	    it("should apply mixin to result returned by fn and return modified result", function() {
			 var quuux = {};
			 var res = bar(quuux);
			 expect(foo.mixin.calls.argsFor(0).shift()).toBe(quuux);
			 expect(res).toBe(baz);
		});
	});
});
