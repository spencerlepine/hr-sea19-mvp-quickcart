import React, { useState, useEffect } from "react";
import useListStorage from '../../context/ListStorageContext';
import ViewAllButton from '../ViewAllButton/ViewAllButton';
import Spinner from 'react-bootstrap/Spinner';
import externalSvg from './external.svg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Popup from '../Popup/Popup';

const RecipeCard = ({ recipes, handleAddToList, togglePopup, setSelectedRecipe }) => (
  recipes.map((recipesObj) => (
    <Card style={{ width: '35rem' }} key={recipesObj['sourceUrl']} onClick={() => setSelectedRecipe(recipesObj)}>
      <Card.Img variant="top" src={recipesObj.image} onClick={togglePopup} />
      <Card.Body onClick={togglePopup}>
        <Card.Title>{recipesObj.title}</Card.Title>
        <Card.Text>
          {(recipesObj.summary || '').substring(0, 200) + '...'}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" onClick={togglePopup}>
        <ListGroup.Item><b>Time:</b> {recipesObj.readyInMinutes} mins</ListGroup.Item>
        <ListGroup.Item><b>Servrings:</b> {recipesObj.servings}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="primary" onClick={handleAddToList}>Add To List</Button>
        <Card.Link href={recipesObj['sourceUrl']}>
          <img src={externalSvg} className="externalIcon" alt="External icon" target="_blank"></img>
        </Card.Link>
      </Card.Body>
    </Card>
  ))
);

export default RecipeCard;
