import React, { useEffect, useState } from 'react';
import NewListButton from '../NewListButton/NewListButton';
import Button from 'react-bootstrap/Button';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import ProductCard from './ProductCard/ProductCard';
import { generateGroceryList, saveNewList } from '../../api';
import categories from '../../config/categories';
import { useLocation, useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import useAuth from '../../context/AuthContext';
import useListStorage from '../../context/ListStorageContext';
import trimProductData from './trimProductData';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ListGenerator = () => {
  const [progress, setProgress] = useState(0);
  const [groceryList, setGroceryList] = useState({});
  const listItemsCount = Object.values(groceryList).reduce((sum, elem) => sum += elem.length, 0);

  let listId = useQuery().get('id');
  const history = useHistory();
  const { userId } = useAuth();
  const { renderOrFetchList, saveListToState } = useListStorage();

  const incrementProgress = () => {
    const delay = 1000;
    if (progress < 100 && listItemsCount === 0) {
      setTimeout(() => {
        setProgress(prevProgress => prevProgress + 1);
        incrementProgress();
      }, delay)
    }
  }
  incrementProgress();

  useEffect(() => {
    if (!listId && listItemsCount === 0) {
      setProgress(0);
      generateGroceryList(categories, (newList) => {
        if (JSON.stringify(newList) === '{}') {
          setGroceryList({ 'Error, please try again': [] });
        } else {
          setGroceryList(newList);
        }
      });
    }
  }, [listId, listItemsCount]);

  useEffect(() => {
    if (listId) {
      renderOrFetchList(listId, userId, (newList) => {
        setGroceryList(newList.list || []);
      })
    }
  }, [listId]);

  const handleSaveList = (list) => {
    // const filtersIds = {};
    // Object.keys(list).forEach((category) => {
    //   filtersIds[category] = list[category].map((e) => e._id)
    // });

    // saveNewList(filtersIds, userId, (listId) => {
    //   saveListToState({ _id: listId, list: filtersIds });
    //   history.push('/search')
    // });

    const filtered = {};
    Object.keys(list).forEach((category) => {
      filtered[category] = list[category].map((e) => trimProductData(e))
    });

    const name = window.prompt('Name this list:') || 'My Shopping List';

    saveNewList(filtered, userId, name, (listId) => {
      saveListToState({ _id: listId, list: filtered, name });
      history.push('/search')
    });
  }

  return (
    <div className="listGenerator">
      <section className="navLinks">
        <NewListButton />

        {!listId && <Button className="saveButton" onClick={() => handleSaveList(groceryList)} variant="primary">Save List</Button>}

        <Button onClick={() => history.push('/search')} variant="primary">View All</Button>
      </section>

      {listId ? (
        <>
          {Object.values(groceryList).reduce(
            (combined, item) => (combined.concat(item)), []
          ).map((groceryObj) => (
            <ProductCard
              listId={listId}
              setGroceryList={setGroceryList}
              key={groceryObj['_id']}
              groceryObj={groceryObj} />
          ))}
        </>
      ) : (
        <>
          {Object.keys(groceryList).length > 0 ? (
            <>
              {Object.keys(groceryList).map((groceryCategory, i) => (
                <CategoryDropdown
                  key={groceryCategory}
                  setGroceryList={setGroceryList}
                  groceries={groceryList[groceryCategory]}
                  categoryName={groceryCategory}
                />
              ))}
            </>
          ) : (
            <div className="listLoading">
              <Spinner animation="border" className="loadingSpinner" />
              <h2>Generating List...</h2>
              <img src="https://media2.giphy.com/media/1YeNJK6FptDdq1q59K/giphy.gif?cid=ecf05e4755i07bt424d07ytq7zbbt8rj9muzhywvfxtsl7po&rid=giphy.gif&ct=g" alt="Loading Mascost" />
              <ProgressBar animated now={progress} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListGenerator;
