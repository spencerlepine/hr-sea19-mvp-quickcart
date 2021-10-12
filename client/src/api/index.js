import axios from 'axios';

const SERVER_URL = 'http://localhost:8000';
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
