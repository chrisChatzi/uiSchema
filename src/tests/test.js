import { priceFormat } from '../general/logic.js'

describe('Check logic', () => {
	it('should return the number formated', () => {
		expect(priceFormat(189500)).toBe("189,500");
	});
});
