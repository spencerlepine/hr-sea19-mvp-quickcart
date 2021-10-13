import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import extractProductData from './extractProductData';
import ProductCard from '../ProductCard/ProductCard';

const CategoryDropdown = ({ groceries, categoryName }) => {
  const [expandCategory, setExpandCategory] = useState(true);

  const formattedGroceries = (groceries || []).map((groceryObj) => extractProductData(groceryObj));
  const categoryTitle = `${categoryName.substring(0, 1).toUpperCase()}${categoryName.substring(1, categoryName.length)}`;

  return (
    <div className="categoryDropdown">
      <button
        onClick={() => setExpandCategory(!expandCategory)}
        className="categoryExpandBtn">
        {!expandCategory ? 'Show More' : 'Minimize'}
      </button>

      <h3>{categoryTitle}</h3>

      {expandCategory && (
        <>
          {formattedGroceries.map((groceryObj) => (
            <ProductCard key={groceryObj['_id']} groceryObj={groceryObj} />
          ))}
        </>
      )}
      <hr />
    </div>
  )
};

export default CategoryDropdown;
