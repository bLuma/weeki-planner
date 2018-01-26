import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'
import moment from 'moment'
import {momentLocale} from './common'
import './index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import AppBar from 'material-ui/AppBar';
import areIntlLocalesSupported from 'intl-locales-supported'


let DateTimeFormat;
/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported([momentLocale])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/' + momentLocale);
}


const LOCALSTORAGE_APIKEY = 'apikey'

function getCachedCredentials() {
  return localStorage.getItem(LOCALSTORAGE_APIKEY)
}

function setCachedCredentials(apikey) {
  localStorage.setItem(LOCALSTORAGE_APIKEY, apikey)
}

moment.locale(momentLocale)

const muiTheme = getMuiTheme({
  button: {
    minWidth: 30
  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppRouter 
      getCachedCredentials={getCachedCredentials} 
      setCachedCredentials={setCachedCredentials} 
      dateTimeFormat={DateTimeFormat}
    />
  </MuiThemeProvider>,
  document.getElementById('root')
);
