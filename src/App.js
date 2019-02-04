import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [hits, setHits] = useState([]);

  async function getHits() {
    const response = await axios.get(
      'http://hn.algolia.com/api/v1/search?query=reacthooks'
    );
    return setHits(response.data.hits);
  }

  useEffect(() => {
    getHits();
  }, []);

  return (
    <>
      <ol>
        {hits.map(hit => (
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        ))}
      </ol>
    </>
  );
}
