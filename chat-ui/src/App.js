import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Signup from './components/Signup';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationContext } from "./components/AuthenticationContext";
import { useState } from 'react';



function App(props) {
  const [active, setActive] = useState('login');


  const swithToLogin = () => {
    setTimeout(()=>{
      setActive("login");
    }, 400);
    
  };

  const switchToSignup = () => {
    setTimeout(()=>{
      setActive("signup");
    }, 400);
  };

  const contextValue = { switchToSignup, swithToLogin };

  return (
    <AuthenticationContext.Provider value={contextValue}> 
     {active === "login" && <Login/> }
     { active === "signup" && <Signup/> }
    </AuthenticationContext.Provider>
  );
}

export default App;
