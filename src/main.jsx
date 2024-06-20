import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Web3ReactProvider } from '@web3-react/core';

import allConnections from './connector';

const connections = allConnections.map(([connector, hooks]) => [connector, hooks]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Web3ReactProvider connectors={connections}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Web3ReactProvider>
);
