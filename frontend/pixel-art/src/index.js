import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const url = {
  'DEV': process.env.REACT_APP_BACKEND_DEV,
  'PROD': process.env.REACT_APP_BACKEND_PROD,
  'DOCKER': process.env.REACT_APP_BACKEND_DOCKER,
}

let baseURL = url[process.env.REACT_APP_ENVIRONMENT];

axios.defaults.baseURL = `http://${baseURL}/`;
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
  console.log(request)
  return request;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

const app = (
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

ReactDOM.render( app,  document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
