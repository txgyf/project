import { combineReducers, legacy_createStore as createStore } from 'redux';

export function configureStore({ reducer }) {
  const RootReducer = combineReducers(reducer);
  const store = createStore(RootReducer);
  return store;
}
