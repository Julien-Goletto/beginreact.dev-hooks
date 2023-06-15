import { useState, useEffect } from 'react';

const NAME_KEY = 'name';

const NameInput = ({ defaultValue }) => {

  const getInitialName = (defaultValue) => localStorage.getItem(NAME_KEY) 
    ? localStorage.getItem(NAME_KEY) 
    : defaultValue;

  const [name, setName] = useState(() => getInitialName(defaultValue));

  useEffect(() => {
    localStorage.setItem(NAME_KEY, name);
  }, [name]);

  return (
    <label className="textfield">
      Name
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
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
