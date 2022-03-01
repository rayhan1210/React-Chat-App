import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../contextapi/Auth_Context';
import { useNavigate } from 'react-router-dom';
import "./login.css";
// import Message from './Message';
import { LoginApiCall } from '../../loginApiCall';
function Login(){
    // using useContext hook, destructing and getting the specific value you need. useContext returns a value and useState returns an array
    // can use useState hook but
    //  what will happen is when user writes anything the input everytime it happes, it will render the Login componenr
    // so aim should be to prevent re-render as much as possible
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const { error, dispatch } = useContext(AuthContext); //destructuring
    const handleSubmit = (e) => {
        e.preventDefault(); //prevents page from refreshing on click/submitting
        LoginApiCall({email: email.current.value, password: password.current.value}, dispatch);
    };
    return(
        <>
           <Container >
                <Row >
                    <Col></Col>
                    <Col className='d-flex mt-5'>
                            <Form  className='align-middle p-5 m-5 rounded border border-4 border-dark formBG' onSubmit={handleSubmit} >
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Email Adress:</Form.Label>
                                    <Form.Control className='mx-2' 
                                        type="text" required 
                                        placeholder='Enter email' 
                                        ref={email}
                                    />
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Password</Form.Label>
                                    <Form.Control className='mx-2' 
                                        type="password" required 
                                        placeholder="Enter Password" 
                                        ref={password} 
                                        autoComplete='on'
                                    />
                                </Form.Group>
                                { error && <h1 className="validator">Invalid Email Adress/Passowrd</h1> }
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Button type="submit" className='mt-1 mx-2' variant="dark" >Login</Button>
                                    <Button  className='bg-dark link-info w-auto' 
                                        onClick={() => {navigate("/signup")}}
                                    >
                                        Register for an account?</Button>
                                </Form.Group>
                            
                            </Form>
                        {/* </div> */}
                     </Col>
                    <Col></Col>
                </Row> 
            </Container>
        </>
    );
}

export default Login;