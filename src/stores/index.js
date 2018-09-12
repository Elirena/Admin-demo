import {createStore, combineReducers, compose} from 'redux';
import persistState from 'redux-localstorage';

const reducersContext = require.context('../reducers', false, /^((?!\.js).)*$/);
const reducers = reducersContext.keys().reduce((res, item) => {
  res[item.substr(2)] = reducersContext(item).default;
  return res;
}, {});

const createLocalStore = compose(
  persistState('user', {
    key: 'adminPanel'
  }),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

let store = createLocalStore(combineReducers(reducers), {});

export default store;
