import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import extractProductData from './extractProductData';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from 'react-bootstrap/Spinner';

const CategoryDropdown = ({ groceries, categoryName, setGroceryList }) => {
  const [expandCategory, setExpandCategory] = useState(true);

  const formattedGroceries = (groceries || []).map((groceryObj) => extractProductData(groceryObj));
  const categoryTitle = `${categoryName.substring(0, 1).toUpperCase()}${categoryName.substring(1, categoryName.length)}`;

  return (
    <div className="categoryDropdown">
      <button
        disabled={formattedGroceries.length === 0}
        style={{ backgroundColor: formattedGroceries.length === 0 ? '#9e9eba' : 'rgb(73 63 190)' }}
        onClick={() => setExpandCategory(!expandCategory)}
        className="categoryExpandBtn">
        {!expandCategory ? 'Show More' : 'Minimize'}
      </button>

      <h3>{categoryTitle}</h3>

      {expandCategory && (
        <>
          {
            formattedGroceries.length > 0 ? (
              <>
                {formattedGroceries.map((groceryObj) => (
                  <ProductCard key={groceryObj['_id']} groceryObj={groceryObj} category={categoryName} setGroceryList={setGroceryList} />
                ))}
              </>
            ) : (
              <p>No items found..</p>
            )
          }
          <ProductCard isPlaceholder key={99} groceryObj={{}} category={categoryName} setGroceryList={setGroceryList} />
        </>
      )}
      <hr />
    </div>
  )
};

export default CategoryDropdown;
