describe('Функция pluck(arr, fieldName)', function() {
	var orig = [
		{
			name: 'Joey Tribbiani',
			age: 28,
			sex: 'male',
			occupation: 'actor'
		},
		{
			name: 'Monica Geller',
			age: 25,
			sex: 'female',
			occupation: 'chief'
		},
		{
			name: 'Chandler Bing',
			age: 27,
			sex: 'male',
			occupation: undefined
		},
		{
			name: 'Rachel Green',
			age: 25,
			sex: 'female',
			occupation: 'saleswoman'
		},
		{
			name: 'Phoebe Buffay',
			age: 26,
			sex: 'female',
			occupation: 'masseuse'
		},
		{
			name: 'Ross Geller',
			age: 27,
			sex: 'male',
			occupation: 'paleontologist'
		}
	];
	it('должна возвращать массив', function() {
		var res = pluck(orig, 'name');
		expect(res).toEqual(jasmine.any(Array));
	});

	it('Не должна изменять исходный массив', function() {
		var sourceCopy = orig.slice();			
		var result = pluck(orig, 'name');
		expect(orig).toEqual(sourceCopy);
	});

	describe('Возвращаемый массив', function() {
			it('должен содержать значения определенного поля объектов переданного массива', function() {
				var ages = pluck(orig, 'age');
				var occupations = pluck(orig, 'occupation');
				var names = pluck(orig, 'name');
				expect(ages).toEqual([28, 25, 27, 25, 26, 27]);
				expect(occupations).toEqual(['actor', 'chief', undefined, 
					'saleswoman', 'masseuse', 'paleontologist'
					]);
				expect(names).toEqual(
					[
					'Joey Tribbiani',
					'Monica Geller',
					'Chandler Bing',
					'Rachel Green',
					'Phoebe Buffay',
					'Ross Geller'
					]
					);
			});
		});
});
