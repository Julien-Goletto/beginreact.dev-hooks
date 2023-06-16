import { useReducer } from 'react';

const initialState = { value: 0 };

const REDUCER_ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  PLUS_FIVE: 'PLUS_FIVE',
  MINUS_FIVE: 'MINUS_FIVE',
}

const reducer = (state, action) => {

  switch (action.type) {
    case REDUCER_ACTIONS.INCREMENT:
      return { 
        ...state, 
        value: state.value + 1,
      };
    case REDUCER_ACTIONS.DECREMENT:
      return { 
        ...state, 
        value: state.value - 1,
      };
    case REDUCER_ACTIONS.RESET:
      return { 
        ...state, 
        value: initialState.value,
      };
    case REDUCER_ACTIONS.PLUS_FIVE:
      return { 
        ...state, 
        value: state.value + 5,
      };
    case REDUCER_ACTIONS.MINUS_FIVE:
      return { 
        ...state, 
        value: state.value - 5,
      };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button>{state.value}</button>
      <button onClick={() => dispatch({ type: 'INCREMENT'})}>+</button>
      <button onClick={() => dispatch({ type: 'PLUS_FIVE'})}>+ 5</button>
      <button onClick={() => dispatch({ type: 'DECREMENT'})}>-</button>
      <button onClick={() => dispatch({ type: 'MINUS_FIVE'})}>- 5</button>
      <button onClick={() => dispatch({ type: 'RESET'})}>Reset</button>
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
