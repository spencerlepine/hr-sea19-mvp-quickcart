import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Popup from '../../Popup/Popup';
import Modal from 'react-bootstrap/Modal';

const NutritionPopup = ({ togglePopup, product }) => (
  <Popup>
    <Modal.Dialog>
      <Modal.Header closeButton onClick={togglePopup}>
        <Modal.Title>Nutrition Facts</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {product['nutrition_image'] && (
          <img
            className="nutitrionImage"
            src={product['nutrition_image']}
            alt='Nutrition facts'
          />
        )}
        <p>{product['ingredients_text'] || 'Unable to find ingredients data'}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={togglePopup} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal.Dialog>
  </Popup>
);

const ProductCard = ({ groceryObj }) => {
  const [showNutrition, setShowNutrition] = useState(false);
  console.log(groceryObj)
  const handleRemove = () => {
    // HERE
    // remove item from list
  }

  const handleReplace = () => {
    // HERE
    // remove item from list
    // fetch replacement
    // render that instead
  }

  return (
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
          <button className="replaceButton" onClick={handleReplace}>Replace</button>
          <button className="removeButton" onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
