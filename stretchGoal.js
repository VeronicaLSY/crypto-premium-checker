// npm install -s node-binance-api
// npm install dotenv
// npm install prompt-sync // NEW
import Binance from 'node-binance-api'; // making API calls to Binance
const binance = new Binance(); // new constructor
import dotenv from 'dotenv';
dotenv.config();
import promptSync from 'prompt-sync';
const prompt = new promptSync({sigint: true});

async function lunoProcess() {
  let currency = prompt("Enter a valid cryptocurrency: ")// NEW
 
  // BTCMYR price from luno:
  const url = "https://api.luno.com/api/1/ticker?pair=" + currency + "MYR" // NEW
  const luno = await fetch(url); // NEW
  const lunoResult = await luno.json();
  const btcMyr = Math.trunc(lunoResult.last_trade);
  console.log(`BTCMYR price on Luno:`.padEnd(30) + `MYR ${btcMyr}`);
  
  // Exchange rate: 
  const myHeaders = new Headers();
  myHeaders.append("apikey", process.env.API_VALUE);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
    const conv = await fetch ("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", requestOptions);
    const convResult = await conv.json();
    const rate = convResult.rates.MYR;
    console.log(`USDMYR:`.padEnd(30) + `${rate}`);

  // BTCUSD price on Luno:
  const btcUsd = btcMyr/rate;
  console.log(`BTCUSD price on Luno:`.padEnd(30) + `USD ${btcUsd}`);
  
  // BTCUSD price on Binance:
  const ticker = await binance.prices();
  const btcbUsd = ticker.BTCUSDT;
  console.log(`BTCUSD price on Binance:`.padEnd(30) + `USD ${btcbUsd}`);
  
  // Price difference:
  const priceDiff = btcUsd - ticker.BTCUSDT;
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