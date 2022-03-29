const getSavedCartItems = async () => {
  // seu código aqui
  const backup = await localStorage.getItem('cartItems');
  return backup;
};
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
