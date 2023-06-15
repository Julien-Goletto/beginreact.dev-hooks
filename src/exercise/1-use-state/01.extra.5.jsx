import { useState } from 'react';

const useTodos = (defaultTodos = ['Learn React', 'Learn React Hooks']) => {
  const [todos, setTodos] = useState(defaultTodos);
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };
  return { todos, addTodo };
}

const Todo = () => {
  const { todos, addTodo } = useTodos();
  return (
    <>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
      <TodoForm addTodo={addTodo} />
    </>
  )
}

const TodoForm = ({ addTodo }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = e.target.todo.value;

    addTodo(todo);

    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="todo" />
      <button type="submit">Add</button>
    </form>
  );
};

const useCount = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((p) => p + 1);
  return { count, increment };
}

const Counter = () => {
  const { count, increment } = useCount();
  return <button onClick={increment}>{count}</button>;
};

const Username = ({ username, setUsername }) => {
  return (
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
};

// 🦁 Il faudra ajouter les props "favoriteAnimal" et "setFavoriteAnimal" ici !
const FavoriteAnimal = ({ favoriteAnimal, setFavoriteAnimal }) => {
  // 🦁 Déplace ce state dans le composant "UserAnimalForm".
  // Tu dois déplacer ce state, car c'est un composant au dessus qui a besoin
  // De cette donnée.
  return (
    <input
      type="text"
      value={favoriteAnimal}
      onChange={(e) => setFavoriteAnimal(e.target.value)}
    />
  );
};

const Greeting = ({ favoriteAnimal, username }) => {
  return (
    <p>
      <b>{username}</b>'s favorite animal is <b>{favoriteAnimal}</b>
    </p>
  );
};

// 🦁 Crée un nouveau composant nommé : "UserAnimalForm".
// Dedans tu vas avoir toute la logique par rapport à la phrase concernant
// le username et le favorite animal.
const UserAnimalForm = () => {
  const [favoriteAnimal, setFavoriteAnimal] = useState('Dog');
  const [username, setUsername] = useState('');

  return(
    <div className="vertical-stack">
        <h2>Animal !</h2>
        <div>
          <span>Favorite Animal</span>
          <FavoriteAnimal favoriteAnimal={favoriteAnimal} setFavoriteAnimal={setFavoriteAnimal} />
        </div>
        <div>
          <span>Username</span>
          <Username username={username} setUsername={setUsername} />
        </div>
        <Greeting username={username} favoriteAnimal={favoriteAnimal} />
      </div>
  );
}

const App = () => {
  
  return (
    <div>
      <h2>TodoApp</h2>
      <Todo />
      <h2>Counter</h2>
      <Counter />
      <UserAnimalForm />
      </div>
  );
};

export default App;
