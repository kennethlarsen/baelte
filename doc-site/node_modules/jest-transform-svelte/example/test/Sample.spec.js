import Sample from '../source/Sample.svelte';

describe('Sample', () => {
	it('is empty by default', (next) => {
		//  create a new element
		const target = document.createElement('div');
		//  render the component in the new element
		const sample = new Sample({ target });

		setTimeout(() => {
			const { firstElementChild: element } = target;

			//  test rendered element
			expect(element.textContent).toBe('');
			expect(element.getAttribute('data-length')).toBe('0');

			//  test component
			expect(sample.text).toBe('');

			sample.text = 'A foo walks into a bar';

			setTimeout(() => {
				expect(element.textContent).toBe('A foo walks into a bar');
				expect(element.getAttribute('data-length')).toBe('22');

				next();
			});
		}, 10);
	});

	it('clicks', (next) => {
		//  create a new element
		const target = document.createElement('div');
		//  render the component in the new element
		const sample = new Sample({ target });

		setTimeout(() => {
			const { firstElementChild: element } = target;

			expect(element.getAttribute('data-clicks')).toBe('0');
			element.click();

			setTimeout(() => {
				expect(element.getAttribute('data-clicks')).toBe('1');

				next();
			}, 10);
		}, 10);
	});

	it.each`
		text         | length
		${'foo'}     | ${'3'}
		${'bar-baz'} | ${'7'}
		${'sample'}  | ${'5'}
	`('$text renders and has length $length', ({ text, length }) => {
		//  create a new element
		const target = document.createElement('div');
		//  render the component in the new element
		const sample = new Sample({ target, data: { text } });

		setTimeout(() => {
			const { firstElementChild: element } = target;

			//  test rendered element
			expect(element.textContent).toBe(text);
			expect(element.getAttribute('data-length')).toBe(length);

			//  test component
			expect(sample.test).toBe(text);
			expect(sample.length).toBe(length);
		}, 10);
	});
});
