import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/richfood-my-react">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
