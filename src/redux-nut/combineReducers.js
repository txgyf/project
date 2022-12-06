export default function combineReducers(reducers) {
  // 返回一个总的reducer
  return function combination(state = {}, action) {
    console.log(state, action, reducers, "action");
    let nextState = {};
    let hasChanged = false;

    for (let key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    hasChanged =
      hasChanged || Object.keys(reducers).length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
}
