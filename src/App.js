import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from 'reactstrap';
import axios from 'axios';

export default function App() {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  async function getHits() {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setHits(response.data.hits);
    } catch (err) {
      setError(err);
    }
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
    setHits([]);
  };

  return (
    <div className='container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded'>
      <img
        src='https://icon.now.sh/react/c0c'
        alt='react logo'
        className='float-right h-12'
      />
      <h1 className='test-grey-darkest font-thin'>Tech News</h1>
      <form onSubmit={handleSearch} className='mb-2'>
        <input
          type='text'
          placeholder='Search'
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className='border p-1 rounded'
        />
        <button type='submit' className='bg-orange rounded m-1 p-1'>
          Search
        </button>
        <button
          className='bg-teal text-white p-1 rounded'
          type='button'
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      {loading ? (
        <Spinner color='dark' />
      ) : (
        <ol className='list-reset leading-normal'>
          {hits.map(hit => (
            <li key={hit.objectID}>
              <a
                href={hit.url}
                className='indigo-dark hover:text-indigo-darkest'
              >
                {hit.title}
              </a>
            </li>
          ))}
        </ol>
      )}
      {error && <div className='text-red font-bold'>{error.message}</div>}
    </div>
  );
}
