import { createStore, applyMiddleware, combineReducers } from "../redux-nut";
// import { createStore, applyMiddleware, combineReducers } from "redux";

// import thunk from "redux-thunk";
// import lodder from "redux-logger";
import promise from "redux-promise";

export function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

// 创建store
const store = createStore(
  combineReducers({ count: countReducer }),
  applyMiddleware(thunk, lodder, promise)
);

export default store;

function lodder({ getState, dispatch }) {
  return (next) => (action) => {
    const prevState = getState();

    console.log("prev State", prevState);

    const returnval = next(action);
    // 等状态值修改之后，在执行新的getstate
    const nextState = getState();
    console.log("next state", nextState);
    return returnval;
  };
}

function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}
