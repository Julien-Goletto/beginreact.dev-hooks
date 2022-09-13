import { useEffect, useState } from 'react';

const getDefaultName = (key, defaultValue) => {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
};

const useStickyState = (key, defaultValue) => {
  const [state, setState] = useState(() => getDefaultName(key, defaultValue));

  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, setValue];
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

// Demo avec le Profiler React
const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setCounter((prev) => prev + 1);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <button onClick={() => setCounter(counter + 1)}>{counter}</button>;
};

const App = () => {
  return (
    <div>
      <Counter />
      <NameInput defaultValue="" />
    </div>
  );
};

export default App;
