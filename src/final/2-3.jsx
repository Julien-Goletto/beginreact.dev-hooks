import { useEffect, useState } from 'react';

const getDefaultName = (key, defaultValue) => {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
};

const useStickyState = (key, defaultValue) => {
  const [state, setState] = useState(() => getDefaultName(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

const NAME_KEY = 'name';

const NameInput = ({ defaultValue }) => {
  const [name, setName] = useStickyState(NAME_KEY, defaultValue);

  return (
    <div>
      Name
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="vertical-stack">
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
      <NameInput defaultValue="" />
    </div>
  );
};

export default App;
