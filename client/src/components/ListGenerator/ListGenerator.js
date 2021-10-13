import React, { useEffect, useState } from 'react';
import NewListButton from '../NewListButton/NewListButton';
import Button from 'react-bootstrap/Button';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import ProductCard from './ProductCard/ProductCard';
import { generateGroceryList } from '../../api';
import categories from '../../config/categories';
import { useLocation } from "react-router-dom";

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

  useEffect(() => {
    if (!listId) {
      generateGroceryList(categories, (newList) => {
        setGroceryList(newList);
      });
    }
  }, [listId]);

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
          ).map((groceryObj) => {
            <ProductCard key={groceryObj['_id']} groceryObj={groceryObj} />
          })}
        </>
      ) : (
        <>
          {Object.keys(groceryList).map((groceryCategory, i) => (
            <CategoryDropdown
              key={groceryCategory}
              groceries={groceryList[groceryCategory]}
              categoryName={groceryCategory}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListGenerator;
