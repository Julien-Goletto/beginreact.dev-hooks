// 🦁 add useState import
import { useState, useEffect } from "react";

const App = () => {
  // 🦁 Remplace le name par un state
  const [name, setName] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [nameHistory, setNameHistory] = useState([]);
  
  const handleChange = (event) => {
    // 🦁 Update le state avec la nouvelle valeur
    setName(event.target.value);
    // setNameHistory([...nameHistory, event.target.value]);
  };
  
  const handleReverse = (event) => {
    setIsReversed(event.target.checked);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (name) setNameHistory((previousNameHistory) => ([...previousNameHistory, name]));
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [name]);

  const handleHistoryDeletion = (event) => {
    console.log(event.target.dataset.key)
    setNameHistory(nameHistory.filter((name, i) => i !== parseInt(event.target.dataset.key)));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        // 🦁 Ajoute la valeur
        value={name}
        // 🦁 Ajoute le onChange pour update le state quand la valeur change
        onChange={handleChange}
      />
      <label>
      Reverse
      <input
        type="checkbox"
        checked={isReversed}
        onChange={handleReverse}
      />
      </label>
      <p>{name ? `Hello ${isReversed ? name.split('').reverse().join('') : name}` : 'Write your name'}</p>
      <ul>
        {
          nameHistory.map((name, i) => (
            <li
              style={{ cursor: 'pointer' }}
              key={i}
              data-key={i}
              onClick={handleHistoryDeletion}
            >
              {name}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
