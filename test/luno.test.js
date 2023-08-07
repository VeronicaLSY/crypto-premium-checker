import { getLunoPriceInMYR } from '../lib/luno.js'

// luno succeed test:
test("Returns Luno Price if request is successful", async () => {
  const MOCK_PRICE = 90000
  const MOCK_JSON_RESP = { last_trade: MOCK_PRICE }

  global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));

  expect(await getLunoPriceInMYR()).toBe(MOCK_PRICE);
});

// luno failed test:
test("Returns Message for Failed Luno Response", async () => {
  const MOCK_STATUS_CODE = 500

  global.fetch = jest.fn(() => Promise.resolve({
    status: MOCK_STATUS_CODE,
    json: () => { }
  }));

  expect(await getLunoPriceInMYR()).toBe("Failed to retrieve Luno Price in MYR. Please try again!");
});