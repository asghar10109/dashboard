import React  from 'react';
import ReactDOM from 'react-dom/client';
 import App from './App';
import { Provider } from 'react-redux';
import Store from "./store"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      <ToastContainer
        autoClose={1500}
        newestOnTop={true}
      />
    </Provider>
  </React.StrictMode>
); 