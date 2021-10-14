import React, { useState, useEffect } from "react";
import useListStorage from '../../context/ListStorageContext';
import ViewAllButton from '../ViewAllButton/ViewAllButton';
import Spinner from 'react-bootstrap/Spinner';
import externalSvg from './external.svg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Popup from '../Popup/Popup';
import RecipeCard from './RecipeCard';
import { useHistory } from 'react-router-dom';
import { addRecipeToList, fetchRandomRecipes } from '../../api';

import sampleRecipes from './sampleRecipes.json'

const RecipesPage = () => {
  const [loading, setLoading] = useState(false);
  const [renderDetailsPopup, setRenderDetailsPopup] = useState(false);
  const [renderListPopup, setRenderListPopup] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const history = useHistory();

  const [recipes, setRecipes] = useState(sampleRecipes.recipes);

  const { allLists, saveListToState, fetchUserLists } = useListStorage();

  const toggleDetailsPopup = () => {
    setRenderDetailsPopup(!renderDetailsPopup);
  }

  const toggleListPopup = () => {
    if (renderListPopup) {
      setSelectedRecipe(null);
    }
    setRenderListPopup(!renderListPopup);
  }

  const handleRefresh = () => {
    setLoading(true);
    fetchUserLists();
    fetchRandomRecipes((newRecipes) => {
      setRecipes((prevList) => prevList.concat(newRecipes));
      setLoading(false);
    });
  }

  const handleAddToList = () => {
    toggleListPopup();
  }

  const handleListChoose = (listObj) => {
    if (selectedRecipe) {
      addRecipeToList(listObj, selectedRecipe, (newList) => {
        saveListToState(newList);
        history.push(`/list?id=${listObj._id}`)
        toggleListPopup();
      })
    } else {
      alert('No Recipe Selected!');
    }
  }

  useEffect(() => {
    handleRefresh();
  }, [])

  return (
    <main className="recipesPage">
      <div className="recipesHeader">
        <h4>Recipes</h4>

        <ViewAllButton />
        <button className="accountButton" onClick={handleRefresh}>Refresh</button>
      </div>

      <div className="recipesScroller">
        {loading ? (
          <Spinner animation="grow" className="loadingSpinner" />
        ) : (
          <>
            {(recipes && recipes.length > 0) ? (
              <RecipeCard recipes={recipes} handleAddToList={handleAddToList} togglePopup={toggleDetailsPopup} setSelectedRecipe={setSelectedRecipe} />
            ) : (
              <>
                <h2>No Recipes found</h2>
                <button className="accountButton" onClick={handleRefresh}>Refresh</button>
              </>
            )}
          </>
        )}

        <>
          {renderListPopup && (
            <Popup togglePopup={toggleListPopup}>
              {allLists.length > 0 ? (
                <>
                  {allLists.map((listObj, i) => {
                    return (
                      <div key={listObj._id}>
                        <h5>{listObj.name}</h5>
                        <button onClick={() => handleListChoose(listObj)}>Choose</button>
                      </div>
                    )
                  })}
                </>
              ) : (
                <p>No Lists found</p>
              )}
            </Popup>
          )}
        </>
      </div>
    </main >
  )
};

export default RecipesPage;
