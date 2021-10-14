import React from "react";
import useListStorage from '../../context/ListStorageContext';
import ViewAllButton from '../ViewAllButton/ViewAllButton';

import sampleRecipes from 'sampleRecipes.json'



const RecipesPage = () => {
  const { allLists } = useListStorage();

  const recipies = sampleRecipes.recipies;

  return (
    <main className="recipesPage">
      <div className="recipesHeader">
        <h4>Recipes</h4>

        <ViewAllButton />
      </div>

      <div className="recipesScroller">

      </div>
    </main>
  )
};

export default RecipesPage;
