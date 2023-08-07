// npm install -s node-binance-api

import Binance from 'node-binance-api';

export async function getBinancePriceInUSD(promptInput) {
  const binance = new Binance();
  const ticker = await binance.prices();

  let currency;
  if (promptInput === "XBT") {
    currency = "BTCBUSD";
    return ticker[currency];
  } else {
    currency = promptInput + "BUSD";
    return ticker[currency];
  }
}