import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { IoMdSend } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextapi/Auth_Context";
import Convo from "./Convos";
import "./Message.css";
import axios from "axios";

function Message() {
    let navigate = useNavigate();
    
    const{ user, dispatch } = useContext(AuthContext);
    //later user will be used to show who is logged in currently

    const [ convos, setConvos ] = useState([]);

    useEffect(()=>{
        const getUserConvos = async () => {
            try{
                const res = await axios.get("/convos/"+user._id);
                setConvos(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getUserConvos();
    }, [user._id]);
    
    return (
        <>
        {/* {console.log(convos)} */}
        {/* <div>{console.log(user._id)}</div> */}
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
                            {   
                            // {/* // is instead {} use () it returns it without having to type return */}
                                convos.map((c) => (
                                    <div key={c._id} onClick={()=>(console.log("clicked"))}>
                                        <Convo key={c._id} convo={c} currentUser={user}/>
                                    </div>
                                ))
                                
                            }
                            
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
            </>
    );
}

export default Message;