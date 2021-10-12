const axios = require('axios');
const config = require('../../config/config');
const sampleList = require('./sampleResponse.json');

const options = {
  headers: {
    'content-type': 'application/json',
  },
};

// const apiKey = config.SPOONACULAR_API_KEY;
// const spoonacularURL = 'https://api.spoonacular.com';
// fetch(req, res, '/food/products/search', { query: 'diary', number: 3 }, {}, 'GET')
//   .then((productData) => {
//     // Modify the valid data returned
//     res.status(200).json(productData);
//   });

const baseURL = 'https://en.openfoodfacts.org';

const fetch = (req, res, url, params, data, method) => (
  axios
    .request({
      ...options,
      params,
      data,
      // url: `${spoonacularURL}${url}?apiKey=${apiKey}`,
      url: `${baseURL}${url}`,
      method,
    })
    .then((response) => response.data)
    .catch((err) => {
      res.status(500).send(err);
    })
);

module.exports = {
  generateList: (req, res) => {
    // const categories = [
    //   {
    //     name: 'meats',
    //     productCount: 5,
    //   },
    //   {
    //     name: 'snacks',
    //     productCount: 5,
    //   },
    // ];
    if (Object.values(req.body).length === 0) {
      res.status(400).json('Invalid category parameters');
    }

    res.status(200).json(sampleList);
    // HERE DELET THIS

    // // https://wiki.openfoodfacts.org/API/Read/Product#Individual_category
    // const categoryPromises = categories.map(({ name: category }) => (
    //   fetch(req, res, `/category/${category}/1.json`, {}, {}, 'GET')
    // ));

    // Promise.all(categoryPromises)
    //   .then((productData) => {
    //     const sorted = {};

    //     categories.forEach((categoryObj, i) => {
    //       const { name, productCount } = categoryObj;

    //       sorted[name] = productData[i].products.slice(0, productCount);
    //     });

    //     res.status(200).json(sorted);
    //   });
  },
  removeListItem: () => {
    console.log('yeet');
  },
  saveEntireList: () => {
    console.log('yeet');
  },
  updateExistingList: () => {
    console.log('yeet');
  },
};
