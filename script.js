// criação de mensagem de carregamento
const containerMae = document.querySelector('.container');
const novaDiv = document.createElement('span');
novaDiv.className = 'loading';
novaDiv.innerText = 'carregando...';
containerMae.appendChild(novaDiv);

const ol = document.querySelector('.cart__items');

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

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
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
// função para buscar lista de produtos da API para jogar no site
const findProductsList = async () => {
  const retornoFuncao = await fetchProducts('computador');
  const resultado = retornoFuncao.results;
  resultado.forEach((produto) => createProductItemElement(produto));
  containerMae.removeChild(novaDiv); // remoção de mensagem após carregamento de fetch
};
findProductsList();

// pegar itens do local storage de colocar no carrinho
const itensSalvos = async () => {
  const item = await getSavedCartItems();
  ol.innerHTML = item;
  const itemsalvo = Array.from(ol.children);
  itemsalvo.forEach((product) => {
    product.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  itensSalvos();
  // função para limpar carrinho
  const btnClear = document.querySelector('.empty-cart');
  const listCart = document.querySelector('.cart__items');
  btnClear.addEventListener('click', () => {
    listCart.innerText = '';
  });
};
