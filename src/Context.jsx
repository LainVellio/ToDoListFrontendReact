import React from 'react';

const StateContext = React.createContext({});
const DispatchContext = React.createContext({});

function reducer(state, action) {
  switch (action.type) {
    default:
      return {};
  }
}

function Provider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {});
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default Provider;
