export default async function getRates(base: string) {
  try {
    const response = await (
      await fetch(`https://cool-currency-convert-server.herokuapp.com/rates?base=${base}`)
    ).json();
    return response;
  } catch (error) {
    console.error({ error });
  }

  return null;
}
