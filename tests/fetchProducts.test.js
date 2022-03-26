require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('verifique se fetchProducts é uma função', () => {
    expect(typeof (fetchProducts)).toBe('function');
  });
  it('verifique se ao chamar a função, fetch é chamado', async () => {
    fetchProducts('computador');
    await expect(fetch).toHaveBeenCalled();
  });
  it('verifica se ao chamar a função fetchProducts, fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    await expect(fetch).toHaveBeenCalledWith(url);
  });
  it('verifica o retorno de fetchProducts tem a mesma estrutura de computadorSearch', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  it('verifica se retorna erro caso não seja passado parametro', async () => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));

  })
});
