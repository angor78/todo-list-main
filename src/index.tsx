import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppWithRedux from "./AppWithRedux";
import { store } from './redux-store/store'
import { Provider } from 'react-redux'
import {HashRouter} from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <AppWithRedux/>
    </HashRouter>
  </Provider>, document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
