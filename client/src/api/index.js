import axios from 'axios';
import config from '../config/config';
import transformedProducts from './transformedProducts';

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

export const saveNewList = (list, userId, name, callback) => {
  const url = `${SERVER_URL}${endpointURL}/list/save`;

  axios.post(url, { list, userId, name })
    .then((listId) => {
      callback(listId.data);
    })
    .catch((err) => console.log(err))
}

export const fetchSingleList = (listId, userId, callback) => {
  const url = `${SERVER_URL}${endpointURL}/list/info`;

  axios.get(url, {
    params: { listId, userId }
  })
    .then((listMeta) => {
      callback(listMeta.data);
    })
    .catch((err) => console.log(err))
}

export const fetchAllUserLists = (userId, callback) => {
  const url = `${SERVER_URL}${endpointURL}/list/user?userId=${userId}`;

  axios.get(url)
    .then((listData) => {
      const parsed = listData.data.map((e) => ({ ...e, list: JSON.parse(e.list) }))
      callback(parsed);
    })
    .catch((err) => console.log(err))
}

export const deleteUserList = (listId, callback) => {
  const url = `${SERVER_URL}${endpointURL}/list/remove?listId=${listId}`;

  axios.delete(url)
    .then(() => {
      callback(listId);
    })
    .catch((err) => console.log(err))
}

/*
* listObj._id
* selectedRecipe.id
*/
export const addRecipeToList = (listObj, selectedRecipe, callback) => {
  const url = `${SERVER_URL}${endpointURL}/list/update?listId=${listObj._id}`;

  // Formatted Recipe Products
  // Append products to listObj.list in new category
  const updatedListObj = {
    ...listObj,
    list: {
      ...listObj.list,
      [selectedRecipe.title]: transformedProducts(selectedRecipe.extendedIngredients)
    },
  }

  // Send /update to server with NEW list
  axios.put(url, updatedListObj)
    .then((updatedList) => {
      console.log(updatedListObj);
      callback(updatedListObj)
    })
}

export const fetchRandomRecipes = (callback) => {
  const url = `${SERVER_URL}${endpointURL}/recipes/random`;

  axios.get(url)
    .then((recipes) => {
      callback(recipes.data);
    })
    .catch((err) => console.log(err))
};
