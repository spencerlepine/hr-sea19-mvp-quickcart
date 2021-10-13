import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { fetchAllUserLists } from '../../api';
import NewListButton from '../NewListButton/NewListButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAuth from '../../context/AuthContext';

const ListViewer = () => {
  const [allLists, setAllLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    if (loading === false) {
      setLoading(true);

      fetchAllUserLists(userId, (listResult) => {
        setAllLists(listResult)
        setLoading(false);
      });
    }
  }, [userId]);

  return (
    <div className="listViewer">
      <NewListButton />

      {loading ? (
        <Spinner animation="grow" className="loadingSpinner" />
      ) : (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Search</Form.Label>
              <Form.Control type="email" placeholder="Enter a list name" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Go
            </Button>
          </Form>

          {allLists.map(({ _id, list: listObj }, i) => (
            <div key={_id} className="listCard">
              <p>{JSON.stringify(listObj)}</p>
            </div>
          ))}
        </>
      )}
    </div >
  )
};

export default ListViewer;
