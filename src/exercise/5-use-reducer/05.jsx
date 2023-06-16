import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { 
        ...state, 
        value: state.value + 1,
      };
    case 'DECREMENT':
      return { 
        ...state, 
        value: state.value - 1,
      };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <button>{state.value}</button>
      <button onClick={() => dispatch({ type: 'INCREMENT'})}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT'})}>-</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

export default App;
