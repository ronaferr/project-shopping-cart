const saveCartItems = (item) => {
  // seu código aqui
  localStorage.setItem('cartItems', item);
// console.log(item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
