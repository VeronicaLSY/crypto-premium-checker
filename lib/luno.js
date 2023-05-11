  // BTCMYR price from luno:

  import promptSync from 'prompt-sync';

  export async function getLunoBTCPriceInMYR() {
    const prompt = new promptSync({sigint: true});
    let currency = prompt("Enter a valid cryptocurrency: ")
    const url = "https://api.luno.com/api/1/ticker?pair=" + currency + "MYR"
    const luno = await fetch(url);
    const lunoResult = await luno.json();
    return Math.trunc(lunoResult.last_trade);
  }