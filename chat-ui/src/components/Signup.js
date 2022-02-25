import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup.css";
import axios from 'axios';

function Signup(props){
    let navigate = useNavigate(); 
    const username = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const email = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Password does not match");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try{
                const res = await axios.post("/auth/register", user);
                navigate("/"); //redirect back to login page.
            }catch(err){
                console.log(err);
            }
        }
    }
    return(
        <>
           <Container >
                <Row >
                    <Col></Col>
                    <Col className='d-flex mt-5'>
                            <Form  className='align-middle p-5 m-5 rounded border border-4 border-dark formBG' onSubmit={handleSubmit}>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Full Name:</Form.Label>
                                    <Form.Control className='mx-2' ref={username} type="text" placeholder='Enter Full Name'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Email Adress:</Form.Label>
                                    <Form.Control className='mx-2' ref={email} type="email" placeholder='Enter email'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Password</Form.Label>
                                    <Form.Control className='mx-2' ref={password} type="password" placeholder="Enter Password" autoComplete='off'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Form.Label  className='mx-2 w-auto fw-bold formBG'>Password</Form.Label>
                                    <Form.Control className='mx-2' ref={passwordAgain} type="password" placeholder="Re-Enter Password" autoComplete='off'/>
                                </Form.Group>
                                <Form.Group  className='mb-3 w-auto formBG'>
                                    <Button className='mx-2' variant="dark" type="submit">Signup</Button>
                                    <Button  className="bg-dark link-info w-auto" onClick={() => {navigate("/")}}>Signin</Button>
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