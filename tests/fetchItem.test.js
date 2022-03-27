require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('verifique se fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toBe('function');
  });
  it('verifica se ao chamar fetchItem com o argumento MLB1615760527, fetch foi chamada', async () => {
    fetchItem('MLB1615760527');
    await expect(fetch).toHaveBeenCalled();
  });
  it('verifica se ao chamar fetchItem com o argumento MLB1615760527, fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    await expect(fetch).toHaveBeenCalledWith(url);
  });
  it('verifica se ao chamar a função com o argumento MLB1615760527, o retorno tenha a mesma estrutura do objeto que está importado no arquivo', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });
  it('verifica se ao chamar fetchItem sem argumento retorna o erro You must provide an url', async () => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'));
  });
});
