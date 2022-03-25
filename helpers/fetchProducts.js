const fetchProducts = async () => {
  // seu código aqui
  try {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  // função FETCH vai busca a url
  const promisse = await fetch(url);
  // promisse será transformada em objeto legivel
  const result = await promisse.json();
  const result1 = result.results;
  result1.forEach((product) => {
    createProductItemElement(product);
  });
  } catch (error) {
    console.log(error);
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
