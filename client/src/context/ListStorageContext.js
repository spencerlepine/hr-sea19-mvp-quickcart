import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchAllUserLists, fetchSingleList, deleteUserList } from '../api';

export const ListStorageContext = React.createContext();

export const ListStorageProvider = ({ children }) => {
  const [allLists, setAllLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderOrFetchList = (listId, userId, callback) => {
    setLoading(true);

    setTimeout(() => {
      if (allLists.some((e) => e._id === listId)) {
        setLoading(false);

        const index = allLists.map(e => e._id).indexOf(listId);
        callback(allLists[index])
      } else {
        fetchSingleList(listId, userId, (newList) => {
          saveListToState(newList);
          setLoading(false);
          callback(newList);
        });
      }
    }, 0);
  }

  const saveListToState = (newList) => {
    if (newList) {
      setAllLists((prevList) => {
        if (prevList.some((e) => e._id === newList._id)) {
          return prevList.map(
            (list) => list._id === newList._id ? newList : list
          );
        } else {
          return prevList.concat(newList);
        }
      });
    }
  }

  const fetchUserLists = (userId) => {
    fetchAllUserLists(userId, (res) => {
      res.forEach((list) => saveListToState(list))
    });
  }

  const deleteList = (listId) => {
    deleteUserList(listId, () => {
      setAllLists((prevList) => prevList.filter(
        (list) => list._id !== listId
      ));
    });
  }

  const value = {
    loading,
    renderOrFetchList,
    saveListToState,
    fetchUserLists,
    allLists: allLists,
    deleteList,
  };

  return <ListStorageContext.Provider value={value}>{children}</ListStorageContext.Provider>;
};

const useListStorage = () => useContext(ListStorageContext);

export default useListStorage;

ListStorageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
