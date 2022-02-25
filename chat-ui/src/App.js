import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./contextapi/Auth_Context";
import { useContext } from 'react';
import Message from './components/Message';
// import { Auth } from './components/Auth';


function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* <Route path="/">
          {user ? <Message/> : <Login/>}
        </Route>
        <Route path="/signup">
          { user ? <Navigate to="/" /> : <Signup/>}
        </Route> */}
        <Route path="/" element ={ user ? <Navigate to="/message" /> : <Login/> } />
        <Route path="/signup" element={ user ? <Navigate to="/" /> : <Signup/> } />
        <Route path="/message" element={user ? <Message/> : <Login/> } />
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
