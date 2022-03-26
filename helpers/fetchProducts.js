const fetchProducts = async ($QUERY) => {
  // seu código aqui
  try {
    if (!$QUERY) {
      throw new Error('You must provide an url');
    }
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`;
    // função FETCH vai busca a url
    const promisse = await fetch(url);
    // promisse será transformada em objeto legivel
    const result = await promisse.json();
    return result;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
