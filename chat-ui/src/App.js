import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { AuthenticationContext } from "./components/AuthenticationContext";
import { useMemo, useState } from 'react';
import Message from './components/Message';
// import { Auth } from './components/Auth';


function App(props) {
  // //destructuing, useState hook return destructuring
  // const [active, setActive] = useState('login');
  // const [authActivity, setActivity] = useState('login');
  // const value = useMemo(() => ({authActivity, setActivity}), [authActivity, setActivity]); //save info

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/message" element={<Message/>} />
      </Routes>
      {/* <AuthenticationContext.Provider value={value} >
        <Routes>
          { value.authActivity === "login" && <Route path="/" element={<Login />} /> }
          {console.log(value.authActivity)}
          { value.authActivity === "signup" && <Route path="signup" element={<Signup />}/>}
        </Routes>
      </AuthenticationContext.Provider> */}
      
    </Router>

  );
}

export default App;
