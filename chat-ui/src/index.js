import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvide } from "./contextapi/Auth_Context";

ReactDOM.render(
  <React.StrictMode>
    {/* react.strictMode _> tool for highlighting potential problems in an apllication */}
    {/* by doing this can access the specific user logged in anywhere in the app */}
    <AuthContextProvide>
      <App />
    </AuthContextProvide>
  </React.StrictMode>,
  document.getElementById('root')
);

