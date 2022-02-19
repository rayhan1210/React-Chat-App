import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthenticationContext } from './AuthenticationContext';
import "./signup.css";

function Signup(props){
    const { swithToLogin } = useContext(AuthenticationContext);
    return(
        <>
           <Container >
                <Row >
                    <Col></Col>
                    <Col className='d-flex mt-5'>
                        {/* <div id="formBG" className='align-middle p-5 m-5 rounded border border-3 border-dark'> */}
                            <Form id="formBG" className='align-middle p-5 m-5 rounded border border-4 border-dark'>
                                <Form.Group id="formBG" className='mb-3 w-auto'>
                                    <Form.Label id="formBG" className='mx-2 w-auto fw-bold'>Full Name:</Form.Label>
                                    <Form.Control className='mx-2' type="text" placeholder='Enter Full Name'/>
                                </Form.Group>
                                <Form.Group id="formBG" className='mb-3 w-auto'>
                                    <Form.Label id="formBG" className='mx-2 w-auto fw-bold'>Email Adress:</Form.Label>
                                    <Form.Control className='mx-2' type="email" placeholder='Enter email'/>
                                </Form.Group>
                                <Form.Group id="formBG" className='mb-3 w-auto'>
                                    <Form.Label id="formBG" className='mx-2 w-auto fw-bold'>Password</Form.Label>
                                    <Form.Control className='mx-2' type="password" placeholder="Enter Password"/>
                                </Form.Group>
                                <Form.Group id="formBG" className='mb-3 w-auto'>
                                    <Form.Label id="formBG" className='mx-2 w-auto fw-bold'>Password</Form.Label>
                                    <Form.Control className='mx-2' type="password" placeholder="Re-Enter Password"/>
                                </Form.Group>
                                <Form.Group id="formBG" className='mb-3 w-auto'>
                                    <Button className='mt-1 mx-2' variant="dark">Signup</Button>
                                    <a href="#" id="formBG" onClick={ swithToLogin } className='link-info'>Signin</a>
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