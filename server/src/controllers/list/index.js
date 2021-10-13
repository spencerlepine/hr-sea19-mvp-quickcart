const axios = require('axios');
const config = require('../../config/config');
const sampleList = require('./sampleResponse.json');
const extractValidProducts = require('./extractValidProducts');

const options = {
  headers: {
    'content-type': 'application/json',
  },
};
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
    if (req.query.categories === undefined) {
      res.status(400).json('Invalid category parameters');
      return;
    }

    const { categories: preFormat } = req.query;
    const categories = JSON.parse(preFormat);

    // https://wiki.openfoodfacts.org/API/Read/Product#Individual_category
    const getRandomInt = (min, max) => {
      const nmin = Math.ceil(min);
      const nmax = Math.floor(max);
      return Math.floor(Math.random() * (max - nmin + 1)) + nmin;
    };

    const categoryPromises = categories.map(({ name: category }) => (
      fetch(req, res, `/category/${category}/${getRandomInt(1, 10)}.json?lc=en`, {}, {}, 'GET')
    ));

    Promise.all(categoryPromises)
      .then((productData) => {
        const sorted = {};

        categories.forEach((categoryObj, i) => {
          const { name, productCount } = categoryObj;

          sorted[name] = extractValidProducts(productData[i].products, productCount);
        });

        res.status(200).json(sorted);
      });
  },
  removeListItem: () => {
    console.log('yeet');
    // HERE
  },
  saveEntireList: (req, res) => {
    // HERE
    res.status(201).json('Success!');
  },
  updateExistingList: () => {
    console.log('yeet');
    // HERE
  },
};

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

// const apiKey = config.SPOONACULAR_API_KEY;
// const spoonacularURL = 'https://api.spoonacular.com';
// fetch(req, res, '/food/products/search', { query: 'diary', number: 3 }, {}, 'GET')
//   .then((productData) => {
//     // Modify the valid data returned
//     res.status(200).json(productData);
//   });
