// npm install dotenv
// npm install prompt-sync // NEW

import { getLunoBTCPriceInMYR } from './lib/luno.js';
import { getExchangeRate } from './lib/exchange-rate.js';
import { getBinanceBTCPriceInUSD } from './lib/binance.js';

async function lunoProcess() {
  // Get Luno BTC price in MYR:
  const btcMyr = await getLunoBTCPriceInMYR();
  console.log(`BTCMYR price on Luno:`.padEnd(30) + `MYR ${btcMyr}`);
  
  // Exchange rate: 
  const rate = await getExchangeRate();
  console.log(`USDMYR:`.padEnd(30) + `${rate}`);

  // BTCUSD price on Luno:
  const btcUsd = btcMyr/rate;
  console.log(`BTCUSD price on Luno:`.padEnd(30) + `USD ${btcUsd}`);
  
  // Get Binance BTC price in USD:
  const btcbUsd = await getBinanceBTCPriceInUSD();
  console.log(`BTCUSD price on Binance:`.padEnd(30) + `USD ${btcbUsd}`);
  
  // Price difference:
  const priceDiff = btcUsd - btcbUsd;
  console.log(`Price difference:`.padEnd(30) + `USD ${priceDiff}`);

  // Luno premium:
  const lunopremium = (priceDiff/btcbUsd).toFixed(4);
  console.log(`Luno premium:`.padEnd(30) + `${lunopremium}%`);
}

async function looping() {
  while (true) {
    await lunoProcess();
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

looping();

// OR: setInterval(lunoProcess, 10000); // NEW, but this will keep looping at interval of 10secs despite whether or not the function has completed