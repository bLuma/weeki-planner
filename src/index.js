import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import moment from 'moment'
import {momentLocale} from './common'
import './index.css';

moment.locale(momentLocale)

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);
