// criação de mensagem de carregamento
const containerMae = document.querySelector('.container');
const novaDiv = document.createElement('span');
novaDiv.className = 'loading';
novaDiv.innerText = 'carregando...';
containerMae.appendChild(novaDiv);

const ol = document.querySelector('.cart__items');
let total = 0; // valor inicial do carrinho

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

const sectionTotal = document.querySelector('.total-price');
sectionTotal.innerHTML = total;
const totalCarrinho = async (value) => {
  const valor = await value;
  const a = valor.lastIndexOf('$');
  const b = parseFloat(valor.substr(a + 1));
  total += b;
  /* if (total % 1 === 0){
    sectionTotal.innerHTML = total
  } else { */
  sectionTotal.innerHTML = total;
};

function cartItemClickListener({ path }) {
  const [li] = path;
  li.remove();
  const testando = Array.from(ol.children);
  total = 0;
  testando.forEach((product) => {
    totalCarrinho(product.innerText);
  });
  localStorage.removeItem('cartItems');
  saveCartItems(ol.innerHTML);
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
  totalCarrinho(ol.innerText);
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
  const olStorage = document.querySelector('.cart__items');
  const item = await getSavedCartItems();
  olStorage.innerHTML = item;
  const itemsalvo = Array.from(olStorage.children);
  itemsalvo.forEach((product) => {
    totalCarrinho(product.innerText);
    product.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  itensSalvos();
  // função para limpar carrinho
  const btnClear = document.querySelector('.empty-cart');
  btnClear.addEventListener('click', () => {
    ol.innerText = '';
    localStorage.removeItem('cartItems');
    total = 0;
    sectionTotal.innerHTML = total;
  });
};
