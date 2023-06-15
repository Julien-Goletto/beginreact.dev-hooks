// 🦁 add useState import
import { useState } from "react";

const App = () => {
  // 🦁 Remplace le name par un state
  const [name, setName] = useState('');

  const handleChange = (event) => {
    // 🦁 Update le state avec la nouvelle valeur
    event.preventDefault();
    setName(event.target.value);
  };

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
      <p>{name ? `Hello ${name}` : 'Write your name'}</p>
    </div>
  );
};

export default App;
