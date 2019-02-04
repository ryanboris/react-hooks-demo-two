import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [hits, setHits] = useState([]);

  useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(response => setHits(response.data.hits))
      .catch(e => console.error(e));
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
