const fetchItem = async ($ItemID) => {
  // seu código aqui
try {
  if (!$ItemID) {
    throw new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/items/${$ItemID}`;
  // função fetch vai buscar response da url
  const promisse = await fetch(url);
  const result = await promisse.json();
  return result;
} catch (error) {
  return error;
}
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
