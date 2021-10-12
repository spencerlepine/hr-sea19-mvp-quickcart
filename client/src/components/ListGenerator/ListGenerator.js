import React, { useEffect, useState } from 'react';
import NewListButton from '../NewListButton/NewListButton';
// import SaveButton from './SaveButton/SaveButton';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import { generateGroceryList } from '../../api';
import categories from '../../config/categories';

const ListGenerator = () => {
  const [groceryList, setGroceryList] = useState({});

  useEffect(() => {
    generateGroceryList(categories, (newList) => {
      setGroceryList(newList);
    });
  }, []);

  return (
    <div className="listGenerator">
      <section>
        <NewListButton />
        {/* <SaveButton /> */}
      </section>

      {Object.keys(groceryList).map((groceryCategory, i) => (
        <CategoryDropdown
          key={i}
          groceries={groceryList[groceryCategory]}
          categoryName={groceryCategory}
        />
      ))}
      {/* <CategoryDropdown /> */}
    </div>
  );
};

export default ListGenerator;
