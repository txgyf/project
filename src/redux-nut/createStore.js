export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState;
  let currentListeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => {
      console.log(currentListeners, "currentListeners");
      listener();
    });
  }
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
      console.log(currentListeners, "currentListeners");
    };
  }
  dispatch({ type: "sdada" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}
