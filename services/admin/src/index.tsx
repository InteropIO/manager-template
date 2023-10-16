import React from 'react';
import ReactDOM from 'react-dom';
import '@glue42/theme';
import '@glue42/theme/dist/packages/rc-select.css';
import "@glue42/server-admin-ui/dist/src/styles/index.css";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);