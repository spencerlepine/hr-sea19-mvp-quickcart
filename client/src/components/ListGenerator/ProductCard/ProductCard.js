import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Popup from '../../Popup/Popup';
import Modal from 'react-bootstrap/Modal';
import { findReplacementItem, removeListItem } from '../../../api';
import Spinner from 'react-bootstrap/Spinner';

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

const ProductCard = ({ groceryObj, category, setGroceryList, listId }) => {
  const [showNutrition, setShowNutrition] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemove = () => {
    const filterList = (prevList) => {
      const output = {};
      Object.keys(prevList).forEach((categoryKey) => {
        output[categoryKey] = prevList[categoryKey].filter((product) => (
          product['_id'] !== groceryObj['_id']
        ))
      });
      return output
    }

    if (listId) {
      removeListItem(listId, groceryObj, category, () => {
        setGroceryList(filterList)
      });
    } else {
      setGroceryList(filterList)
    }
  }

  const handleReplace = () => {
    setLoading(true);
    findReplacementItem(category, (newProduct) => {
      if (listId) {
        removeListItem(groceryObj);
      }

      setGroceryList((prevList) => {
        const output = {};
        Object.keys(prevList).forEach((categoryKey) => {
          output[categoryKey] = prevList[categoryKey].map((product) => (
            product['_id'] !== groceryObj['_id'] ? product : newProduct
          ))
        });
        return output
      })
      setLoading(false);
    });
  }

  return (
    <div key={groceryObj["_id"]} className="listCard">
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <img alt="Product" src={groceryObj.image}></img>

          <div className="productCardDetails">

            <h5>{(groceryObj.name).substring(0, 30)}</h5>

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
              {category && (
                <>
                  <button className="replaceButton" onClick={handleReplace}>Replace</button>
                  <button className="removeButton" onClick={handleRemove}>Remove</button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
