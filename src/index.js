import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import moment from 'moment'
import {momentLocale} from './common'
import './index.css';

const LOCALSTORAGE_APIKEY = 'apikey'

function getCachedCredentials() {
  return localStorage.getItem(LOCALSTORAGE_APIKEY)
}

function setCachedCredentials(apikey) {
  localStorage.setItem(LOCALSTORAGE_APIKEY, apikey)
}

moment.locale(momentLocale)

ReactDOM.render(
  <AppRouter getCachedCredentials={getCachedCredentials} setCachedCredentials={setCachedCredentials} />,
  document.getElementById('root')
);
