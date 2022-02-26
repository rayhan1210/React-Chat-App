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
  // console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element ={ user ? <Navigate to="/message" /> : <Login/> } />
        <Route path="/signup" element={ user ? <Navigate to="/" /> : <Signup/> } />
        <Route path="/message" element={user ? <Message/> : <Login/> } />
      </Routes>
    </Router>

  );
}

export default App;
