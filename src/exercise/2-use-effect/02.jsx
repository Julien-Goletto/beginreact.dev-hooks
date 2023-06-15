import { useState } from 'react';

const NAME_KEY = 'name';

const useName = (defaultValue) => {

  const getInitialName = (defaultValue) => localStorage.getItem(NAME_KEY) 
    ? localStorage.getItem(NAME_KEY) 
    : defaultValue;
  
  const [name, setName] = useState(() => getInitialName(defaultValue));

  const setValue = () => {
    localStorage.setItem(NAME_KEY, name);
  }

  setValue();

  return [name, setName];

}

const NameInput = ({ defaultValue }) => {

  const [name, setName] = useName(defaultValue);

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
