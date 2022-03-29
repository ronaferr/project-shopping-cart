const getSavedCartItems = () => {
  // seu código aqui
  // const ol = document.querySelector('.cart__items');
  const backup = localStorage.getItem('cartItems');
};
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
