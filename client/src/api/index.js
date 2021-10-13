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
    .catch((err) => console.log(err))
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
  const url = `${SERVER_URL}${endpointURL}/list/save`
  axios.post(url, list)
    .then(() => {
      callback();
    })
    .catch((err) => console.log(err))
}
