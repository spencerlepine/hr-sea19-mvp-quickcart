const getRandomInt = (min, max) => {
  const nmin = Math.ceil(min);
  const nmax = Math.floor(max);
  return Math.floor(Math.random() * (max - nmin + 1)) + nmin;
};

const isValidProduct = (productData) => {
  if (productData && (productData['name'] || productData['product_name']) && productData['lc'] === 'en' && (productData['popularity_key'] || 0) > 5) {
    return true;
  }
  return false;
};

const extractValidProducts = (productList, productCount) => {
  const outputList = [];
  if (productList.length < productCount) {
    return productList;
  }

  let randomIndex = getRandomInt(0, productList.length - 2);
  let tries = 0;
  while (outputList.length < productCount && tries < 100) {
    const thisProduct = productList[randomIndex];
    if (isValidProduct(thisProduct) && (outputList.length === 0 || outputList.every((e) => e['_id'] !== thisProduct['_id']))) {
      outputList.push(thisProduct);
    }
    tries += 1;
    randomIndex = getRandomInt(0, productList.length);
  }

  return outputList;
};

module.exports = extractValidProducts;
