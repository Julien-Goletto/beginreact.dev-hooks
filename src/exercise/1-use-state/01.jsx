// 🦁 add useState import
import { useState } from "react";

const App = () => {
  // 🦁 Remplace le name par un state
  const [name, setName] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleChange = (event) => {
    // 🦁 Update le state avec la nouvelle valeur
    setName(event.target.value);
  };

  const handleReverse = (event) => {
    setIsReversed(event.target.checked);
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
    </div>
  );
};

export default App;
