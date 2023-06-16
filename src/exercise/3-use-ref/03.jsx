/* eslint-disable no-unused-vars */ // 🦁 Enlève cette ligne
import { useState, useRef } from 'react';

const useDebounce = (callback, time) => {

  const debounce = useRef(null);

  const onDebounce = (...args) => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(
      () => callback(...args), 
      time);
  };

  return onDebounce;
};

const fetchAgeByName = (name) => {
  return fetch(`https://api.agify.io/?name=${name}`).then((res) => res.json());
};

const App = () => {
  const [result, setResult] = useState(null);
  
  const onSearch = useDebounce(() => {
    fetchAgeByName(inputRef.current.value).then((data) => {
      setResult(data);
    });
  }, 500);

  const inputRef = useRef(null);

  return (
    <div>
      <input
        type="text"
        placeholder="Search bar"
        onChange={(event) => {
          onSearch();
        }}
        ref={inputRef}
      />
      {result ? (
        <div style={{ padding: 16 }}>
          The age for <b>{result.name}</b> is <b>{result.age}</b> and there is{' '}
          <b>{result.count}</b> people with this name.
        </div>
      ) : null}
    </div>
  );
};

export default App;
