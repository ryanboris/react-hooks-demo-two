import React, { useState, useEffect, useRef } from 'react';
import { Spinner, Button } from 'reactstrap';
import axios from 'axios';
import styled from 'styled-components';

const AppWrapper = styled.div`
  form {
    margin: 0 0 50px 0;
    input {
      margin: 40px 0 0 1%;
    }
    button {
      margin: 0 1%;
    }
  }
`;

export default function App() {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef();

  async function getHits() {
    setLoading(true);
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setHits(response.data.hits);
    setLoading(false);
  }

  useEffect(() => {
    getHits();
  }, []);

  const handleSearch = event => {
    event.preventDefault();
    getHits();
  };

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <AppWrapper>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <Button color='primary' size='sm' type='submit'>
          Search
        </Button>
        <Button
          color='primary'
          size='sm'
          type='button'
          onClick={handleClearSearch}
        >
          Clear
        </Button>
      </form>
      {loading ? (
        <Spinner color='dark' />
      ) : (
        <ol>
          {hits.map(hit => (
            <li key={hit.objectID}>
              <a href={hit.url}>{hit.title}</a>
            </li>
          ))}
        </ol>
      )}
    </AppWrapper>
  );
}
