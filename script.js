// criação de mensagem de carregamento
const containerMae = document.querySelector('.container');
const novaDiv = document.createElement('span');
novaDiv.className = 'loading';
novaDiv.innerText = 'carregando...';
containerMae.appendChild(novaDiv);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function adcItemList(item) {
  const mae = document.querySelector('.items');
  mae.appendChild(item);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener({ path }) {
  const [li] = path;
  li.remove();
}

const boxValor = document.querySelector('.total-price');
const total = 0;
const adcValor = async (valor) => {
  const price = await valor;
  boxValor.innerText = total + price;
};

const valorAtual = [];
const totalPrice = async (valor) => {
  await valorAtual.push(valor);
  const soma = valorAtual.reduce((acc, element) => acc + element);
  adcValor(soma);
};

function createCartItemElement({ id, title, price }) {
  const ol = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  totalPrice(price);
  ol.appendChild(li);
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', async () => {
      const a = await fetchItem(getSkuFromProductItem(section));
      createCartItemElement(a);
    });
  adcItemList(section);
  return section;
}

const xablau = async () => {
  const retornoFuncao = await fetchProducts('computador');
  const resultado = retornoFuncao.results;
  resultado.forEach((produto) => createProductItemElement(produto));
  containerMae.removeChild(novaDiv); // remoção de mensagem após carregamento de fetch
  getSavedCartItems();
};
xablau();

window.onload = () => {
  // função para limpar carrinho
  const btnClear = document.querySelector('.empty-cart');
  const listCart = document.querySelector('.cart__items');
  btnClear.addEventListener('click', () => {
    listCart.innerText = '';
  });
  // fazer backup do carrinho
};
