import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./contextapi/Auth_Context";
//  "./contextapi/Auth_Context";
import { useContext } from 'react';
import Message from './components/messenger/Message';
import { Container, DropdownButton, Dropdown, } from "react-bootstrap";

 
function App() {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <>
    {user ? 
      <Container className="d-flex justify-content-center dropdown-box">
          <div className="dropDownMenu">
            <DropdownButton title={user.username}>
              <Dropdown.Item as="button">Profile</Dropdown.Item>
              <Dropdown.Item as="button">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button"
                onClick={() => {
                  dispatch({
                      type: "SIGN_OUT"
                  });
                  <Navigate to="/" />
                }
              } 
              >Log Out</Dropdown.Item>
            </DropdownButton>
          </div>
      </Container> : "" }
      
     <Router>
      <Routes>
        <Route path="/" element ={ user ? <Navigate to="/message" /> : <Login/> } />
        <Route path="/signup" element={ user ? <Navigate to="/" /> : <Signup/> } />
        <Route path="/message" element={user ? <Message/> : <Login/> } />
      </Routes>
    </Router> 

    </>
  );
}

export default App;
