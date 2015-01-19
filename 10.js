describe('Функция count(obj)', function() {
	it('должна возвращать число свойств в объекте obj', function() {
	   var ob = { },
	   		res = count(ob);
	   expect(res).toBe(0);

	   ob.foo = 'bar';
	   res = count(ob);
	   expect(res).toBe(1);
	   ob.baz = 'quax';
	   ob.quuax = 'bla-bla-bla';
	   res = count(ob);
	   expect(res).toBe(3);
	   expect(count([1, 2])).toBe(2);
	   expect(count(function()  { })).toBe(0);
	});

});