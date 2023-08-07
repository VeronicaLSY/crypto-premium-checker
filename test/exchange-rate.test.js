import { getExchangeRate } from '../lib/exchange-rate.js';

test("Returns exchange rate if API request succeeds", async () => {
  const MOCK_RATE = 4.5;

  // Mock the fetch() method
  global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ conversion_rates: { MYR: MOCK_RATE } }),
    })
  );
 
  expect(await getExchangeRate()).toBeCloseTo(MOCK_RATE);
});