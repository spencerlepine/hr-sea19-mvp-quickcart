import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';
import { fetchAllUserLists } from '../../api';
import NewListButton from '../NewListButton/NewListButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAuth from '../../context/AuthContext';
import useListStorage from '../../context/ListStorageContext';

const ListViewer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { allLists, loading, fetchUserLists, deleteList } = useListStorage();
  const history = useHistory();
  const { userId } = useAuth();

  useEffect(() => {
    fetchUserLists(userId);
  }, [userId]);

  const handleListSelect = (id) => {
    history.push(`/list?id=${id}`)
  }

  return (
    <div className="listViewer">
      <NewListButton />

      {loading ? (
        <Spinner animation="grow" className="loadingSpinner" />
      ) : (
        <>
          <Form className="searchBar">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Search</Form.Label>
              <Form.Control type="email" placeholder="Enter a list name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={() => setSearchQuery('')}>
              Clear
            </Button>
          </Form>

          {allLists.map(({ _id, name, list: listObj }, i) => (
            <>
              {(searchQuery === '' || (new RegExp(`${searchQuery}`, 'gi')).test(name)) && (
                <div key={_id} className="listCard">
                  <div className="listDetails" onClick={() => handleListSelect(_id)}>
                    <h4>{name}</h4>
                    <p>Item count: {Object.values(listObj).reduce((sum, elem) => sum += elem.length, 0)}</p>
                  </div>
                  <div>
                    <button onClick={() => deleteList(_id)}>Delete</button>
                  </div>
                </div>
              )}
            </>
          ))}
        </>
      )}
    </div >
  )
};

export default ListViewer;
