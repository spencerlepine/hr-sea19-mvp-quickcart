import axios from 'axios';
import config from '../config/config';

const SERVER_URL = config.SERVER_URL;
const endpointURL = '/api';

export const generateGroceryList = (categories, callback) => {
  const url = `${SERVER_URL}${endpointURL}/list/generate`
  axios.get(url, {
    params: {
      categories: JSON.stringify(categories)
    }
  })
    .then((listMeta) => {
      callback(listMeta.data)
    })
    .catch((err) => {
      callback({})
      console.log(err)
    })
}

export const removeListItem = (listId, product, category, callback) => {
  const url = `${SERVER_URL}${endpointURL}/list/remove`
  axios.delete(url, { listId, product, category })
    .then((productMeta) => {
      callback(productMeta.data)
    })
    .catch((err) => console.log(err))
}

export const findReplacementItem = (category, callback) => {
  const url = `${SERVER_URL}${endpointURL}/products/find-replacement`
  axios.get(url, {
    params: { category }
  })
    .then((productMeta) => {
      callback(productMeta.data)
    })
    .catch((err) => console.log(err))
}

export const saveNewList = (list, callback) => {
  const url = `${SERVER_URL}${endpointURL}/list/save`;
  // HERE
  const userId = window.prompt('Enter your userId') || 'demoUser';

  axios.post(url, { list, userId })
    .then(() => {
      callback();
    })
    .catch((err) => console.log(err))
}

export const fetchAllUserLists = (list, callback) => {
  // Here
  const userId = window.prompt('Enter your userId') || 'demoUser';

  const url = `${SERVER_URL}${endpointURL}/list/user?userId=${userId}`;

  axios.get(url)
    .then((listData) => {
      const parsed = listData.map((e) => (JSON.parse(e.list)))
      callback(parsed);
    })
    .catch((err) => console.log(err))
}

