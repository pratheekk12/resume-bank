import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider } from 'react-redux'
import './index.css';
import App from './App';
import configureStore from './Redux/store/configureStore'


const store = configureStore()

  // if(localStorage.getItem('token')){
  //   store.dispatch(getProfiles())
  // }

const ele =(
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
  </BrowserRouter>
)


ReactDOM.render(ele,document.getElementById("root"));

