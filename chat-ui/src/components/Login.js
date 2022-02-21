import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthenticationContext } from './AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import Message from './Message';

function Login(props){
    // using useContext hook, destructing and getting the specific value you need. useContext returns a value and useState returns an array
    // const { setActivity } = useContext(AuthenticationContext);
    const [name, setValue ] = useState('');
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/message");
    }
    return(
        <>
           <Container >
                <Row >
                    <Col></Col>
                    <Col className='d-flex mt-5'>
                        {/* <div id="formBG" className='align-middle p-5 m-5 rounded border border-3 border-dark'> */}
                            <Form  className='align-middle p-5 m-5 rounded border border-4 border-dark formBG' 
                            onSubmit={handleSubmit} >
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Email Adress:</Form.Label>
                                    <Form.Control className='mx-2' type="text" placeholder='Enter email' onChange={(e)=>{
                                        setValue(e.target.value)
                                    }}/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Password</Form.Label>
                                    <Form.Control className='mx-2' type="password" placeholder="Enter Password" autoComplete='on'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Button type="submit" className='mt-1 mx-2' variant="dark" onSubmit={()=>{<Message/>}}>Login</Button>

                                    <Button  className='bg-dark link-info w-auto' onClick={() => {
                                        navigate("/signup");
                                            // setTimeout(()=>{
                                            //     setActivity("signup");
                                            // }, 100);
                                        }
                                    }>Register for an account?</Button>
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