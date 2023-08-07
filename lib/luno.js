export async function getLunoPriceInMYR(promptInput) {
  const url = "https://api.luno.com/api/1/ticker?pair=" + promptInput + "MYR";
  const luno = await fetch(url);

  if (luno.status === 200) {
    const lunoResult = await luno.json();
    return Math.trunc(lunoResult.last_trade);
  } else {
    return "Failed to retrieve Luno Price in MYR. Please try again!";
  }
}
