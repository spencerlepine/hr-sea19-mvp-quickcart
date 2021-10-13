import React, { useEffect, useState } from 'react';
import NewListButton from '../NewListButton/NewListButton';
import Button from 'react-bootstrap/Button';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import ProductCard from './ProductCard/ProductCard';
import { generateGroceryList } from '../../api';
import categories from '../../config/categories';
import { useLocation } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

// HERE
// Save list to cart
const SaveButton = () => (
  <Button>Save List</Button>
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ListGenerator = () => {
  const [groceryList, setGroceryList] = useState({});
  let listId = useQuery().get('id');
  const listItemsCount = Object.values(groceryList).reduce((sum, elem) => sum += elem.length, 0);

  useEffect(() => {
    if (!listId && listItemsCount === 0) {
      generateGroceryList(categories, (newList) => {
        setGroceryList(newList);
      });
    }
  }, [listId, listItemsCount]);

  return (
    <div className="listGenerator">
      <section>
        <NewListButton />

        {listId && <SaveButton />}
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
            <Spinner animation="grow" className="loadingSpinner" />
          )}
        </>
      )}
    </div>
  );
};

export default ListGenerator;
