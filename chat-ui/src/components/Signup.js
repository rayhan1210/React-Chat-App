import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthenticationContext } from './AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import "./signup.css";

function Signup(props){
    // const { setActivity } = useContext(AuthenticationContext);
    let navigate = useNavigate()
    return(
        <>
           <Container >
                <Row >
                    <Col></Col>
                    <Col className='d-flex mt-5'>
                            <Form  className='align-middle p-5 m-5 rounded border border-4 border-dark formBG'>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Full Name:</Form.Label>
                                    <Form.Control className='mx-2' type="text" placeholder='Enter Full Name'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Email Adress:</Form.Label>
                                    <Form.Control className='mx-2' type="email" placeholder='Enter email'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Password</Form.Label>
                                    <Form.Control className='mx-2' type="password" placeholder="Enter Password" autoComplete='off'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Password</Form.Label>
                                    <Form.Control className='mx-2' type="password" placeholder="Re-Enter Password" autoComplete='off'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Button className='mx-2' variant="dark">Signup</Button>
                                    <Button  className="bg-dark link-info w-auto" onClick={() => {
                                            navigate("/")
                                            // setTimeout(()=>{
                                            //     setActivity("login");
                                            // }, 100);
                                        }
                                    }>Signin</Button>
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

export default Signup;