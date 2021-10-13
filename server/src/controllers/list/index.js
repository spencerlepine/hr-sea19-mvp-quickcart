const axios = require('axios');
const config = require('../../config/config');
const sampleList = require('./sampleResponse.json');
const extractValidProducts = require('./extractValidProducts');
const UserList = require('../../models/UserList');

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

    res.status(200).json(sampleList);
    /*
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
      */
  },
  removeListItem: () => {
    console.log('yeet');
    // HERE
  },
  saveEntireList: (req, res) => {
    const userList = new UserList({
      userId: req.body.userId,
      list: JSON.stringify(req.body.list),
    });

    const savePromise = new Promise((resolve, reject) => {
      // Save model
      userList.save((err) => {
        if (err) {
          return reject(new Error(`Error with exam ersult save... ${err}`));
        }
        // Return saved model
        return resolve(userList);
      });
    });

    savePromise
      .then((resultData) => {
        res.status(201).json(resultData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  fetchUserLists: (req, res) => {
    const { userId: id } = req.query;

    UserList.find({ userId: id })
      .then((items) => {
        res.status(200).json(items);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.error(`Failed to find documents: ${err}`);
      });
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
