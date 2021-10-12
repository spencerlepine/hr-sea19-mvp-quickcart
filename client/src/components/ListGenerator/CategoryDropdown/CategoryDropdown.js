import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Popup from '../../Popup/Popup';
import extractProductData from './extractProductData';

const NutritionPopup = ({ togglePopup, product }) => (
  <Popup>
    <Modal.Dialog>
      <Modal.Header closeButton onClick={togglePopup}>
        <Modal.Title>Nutrition Facts</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{product['ingredients_text']}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={togglePopup} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal.Dialog>
  </Popup>
);

const CategoryDropdown = ({ groceries, categoryName }) => {
  const [expandCategory, setExpandCategory] = useState(true);
  const [showNutrition, setShowNutrition] = useState(false);

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
            <div key={groceryObj["_id"]} className="listCard">
              <img alt="Product" src={groceryObj.image}></img>

              <div className="productCardDetails">


                <h5>{groceryObj.name}</h5>

                <>
                  <Button
                    className="nutritionButton"
                    onClick={() => setShowNutrition(!showNutrition)}
                  >
                    View Nutrition
                  </Button>
                  {showNutrition && (
                    <NutritionPopup product={groceryObj} togglePopup={() => setShowNutrition(!showNutrition)} />
                  )}
                </>

                <div className="productCardButtons">
                  <button className="replaceButton">Replace</button>
                  <button className="removeButton">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      <hr />
    </div>
  )
};

export default CategoryDropdown;
