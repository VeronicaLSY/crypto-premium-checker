// npm install prompt-sync

import { getLunoPriceInMYR } from './lib/luno.js';
import { getExchangeRate } from './lib/exchange-rate.js';
import { getBinancePriceInUSD } from './lib/binance.js';
import promptSync from 'prompt-sync';

async function getLunoPremium() {
  while (true) {
    const prompt = new promptSync({sigint: true});
    let promptInput = prompt("Enter a valid cryptocurrency:    ")

    const lunoMYR = await getLunoPriceInMYR(promptInput);
    console.log(promptInput + `MYR price on Luno:`.padEnd(30) + `MYR ${lunoMYR}`);

    const exchangeRate = await getExchangeRate();
    console.log(`USDMYR:`.padEnd(33) + `${exchangeRate}`);

    const lunoUSD = lunoMYR / exchangeRate;
    console.log(promptInput + `USD price on Luno:`.padEnd(30) + `USD ${lunoUSD}`);

    const binanceUSD = await getBinancePriceInUSD(promptInput);
    console.log(promptInput + `USD price on Binance:`.padEnd(30) + `USD ${binanceUSD}`);

    const priceDiff = lunoUSD - binanceUSD;
    const lunopremium = (priceDiff / binanceUSD).toFixed(4);
    console.log(`Price difference:`.padEnd(33) + `USD ${priceDiff}`); 
    console.log(`Luno premium:`.padEnd(33) + `${lunopremium}%`);
    
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

getLunoPremium();