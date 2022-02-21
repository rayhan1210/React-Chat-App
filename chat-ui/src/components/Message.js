import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Message.css";
// import { i } from 'bootstrap-icons';
import { IoMdSend } from "react-icons/io";

function Message() {
    let navigate = useNavigate();
    return (
        <Container className="messenger-box">
            <Button className="logOutbutton" onClick={()=>{navigate("/");}}>Logout</Button>
                <Row>
                    <Col className='messenger d-flex mt-5'>
                        <input placeholder="Search user" className="searchUser"/>
                        <div className="convoList">
                            <div></div>
                        </div>
                        <div className="convo">
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                        {/* should be either form or input with button to send message => form as you are sending/posting message */}
                            {/* <input className="sendMsgInput" type="text"/>
                            <button className="sendBtn"><IoMdSend className="icon"/></button> */}
                        </div>
                        <div id="stackBox">
                            <textarea className="sendMsgInput" type="text"></textarea>
                            <button className="sendBtn"><IoMdSend className="icon"/></button>
                        </div>
                    </Col>
                </Row> 
            </Container>
    );
}

export default Message;