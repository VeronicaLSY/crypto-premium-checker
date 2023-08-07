const { getBinancePriceInUSD } = require('../lib/binance.js');

beforeEach(() => {
  jest.resetModules(); // reset module mocks before each test to not affect other tests in this file
});

jest.mock('node-binance-api', () => {
  return class Binance {
    prices() {
      const MOCK_PRICE = 20000;
      const MOCK_CURRENCY = "LTCBUSD";
      const MOCK_JSON_RESP = { [MOCK_CURRENCY]: MOCK_PRICE };
      return MOCK_JSON_RESP;
    }
  };
});

test("Returns Binance price if request is successful", async () => {
  const promptInput = "LTC";
  const MOCK_PRICE = 20000;
  expect(await getBinancePriceInUSD(promptInput)).toBe(MOCK_PRICE);
});