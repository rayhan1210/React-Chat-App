import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Message.css";
import { IoMdSend } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../contextapi/Auth_Context";

function Message() {
    let navigate = useNavigate();
    
    const{ user, dispatch } = useContext(AuthContext);
    //later user will be used to show who is logged in currently
    return (
        <Container className="messenger-box">
            {/* <div>{user.username}</div> */}
            <Button className="logOutbutton" 
                onClick={() => {
                        dispatch({
                            type: "SIGN_OUT"
                        });
                        navigate("/");
                    }
                }
            >Logout
            </Button>
                <Row>
                    <Col className='messenger d-flex mt-5'>
                        <input placeholder="Search user" className="searchUser"/>
                        <div className="convoList">
                            <div></div>
                        </div> 
                        <div className="convo">
                            <div>Hello there!</div>
                            <div>Hello there!</div>
                            {/* should be either form or input with button to send message => form as you are sending/posting message */}
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