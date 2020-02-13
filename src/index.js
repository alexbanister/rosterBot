import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './Reducers';
import './index.css';
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

console.log("TESTING COMMITS")

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
