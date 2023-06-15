import { useEffect, useState, useId } from 'react';

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

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [active, setIsActive] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (!active) return;
      setCounter((prev) => prev + 1);
    }
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [active]);

  const inputId = useId();

  return(
    <>
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
      <label htmlFor={inputId}>Activer le compteur au resize ?</label>
      <input type="checkbox" name="isActive" id={inputId} checked={active} onChange={() => setIsActive(!active)} />
    </>
  );
}

const App = () => {

  return (
    <div className="vertical-stack">
      <Counter />
      <NameInput defaultValue="" />
    </div>
  );
};

export default App;
