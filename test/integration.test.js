//INTEGRATION TEST NOT COMPLETED YET DUE TO PROMPT-SYNC;

const { getLunoPremium } = require("../index");

const MOCK_LUNO_PRICE = 25000;
const MOCK_JSON_RESP = { last_trade: MOCK_LUNO_PRICE };
jest.mock("../lib/luno.js", () => {
  return {
    getLunoPriceInMYR() {
      return new Promise((res) => {
        res(MOCK_JSON_RESP);
      });
    },
  };
});

const MOCK_RATE = 4.5;
jest.mock("../lib/exchange-rate.js", () => {
  return {
    getExchangeRate() {
      return new Promise((res) => {
        res(MOCK_RATE);
      });
    },
  };
});

const MOCK_BINANCE_PRICE = 20000;
jest.mock("../lib/binance.js", () => {
  return {
    getBinancePriceInUSD(promptInput) {
      return new Promise((res) => {
        res(MOCK_BINANCE_PRICE);
      });
    },
  };
});

// Mock promptSync to return the promptInput value
const mockPromptSync = jest.fn(() => "LTC");
jest.mock("prompt-sync", () => mockPromptSync);

test("Test suite for getLunoPremium", async () => {
  // Mock console.log function to check whether it's called with the expected arguments
  const consoleLogSpy = jest.spyOn(console, "log");

  // Run the function to test
  await getLunoPremium("LTC", mockPromptSync);

  // Check whether console.log was called with the expected arguments
  expect(consoleLogSpy).toHaveBeenCalledWith(
    `LTCMYR price on Luno:`.padEnd(30) + `MYR ${MOCK_LUNO_PRICE}`
  );
  expect(consoleLogSpy).toHaveBeenCalledWith(`USDMYR:`.padEnd(30) + MOCK_RATE);
  expect(consoleLogSpy).toHaveBeenCalledWith(
    `LTCUSD price on Luno:`.padEnd(30) + `USD ${MOCK_LUNO_PRICE / MOCK_RATE}`
  );
  expect(consoleLogSpy).toHaveBeenCalledWith(
    `LTCUSD price on Binance:`.padEnd(30) + `USD ${MOCK_BINANCE_PRICE}`
  );
  expect(consoleLogSpy).toHaveBeenCalledWith(
    `Price difference:`.padEnd(30) +
      `USD ${MOCK_LUNO_PRICE / MOCK_RATE - MOCK_BINANCE_PRICE}`
  );
  expect(consoleLogSpy).toHaveBeenCalledWith(
    `Luno premium:`.padEnd(30) +
      `${(
        ((MOCK_LUNO_PRICE / MOCK_RATE - MOCK_BINANCE_PRICE) /
          MOCK_BINANCE_PRICE) *
        100
      ).toFixed(4)}%`
  );

  // Restore the original implementation of console.log
  consoleLogSpy.mockRestore();
});
