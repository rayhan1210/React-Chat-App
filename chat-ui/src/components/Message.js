import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { IoMdSend } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contextapi/Auth_Context";
import Convo from "./Convos";
import "./Message.css";
import axios from "axios";

function Message() {
    let navigate = useNavigate();
    
    const{ user, dispatch } = useContext(AuthContext);
    //later user will be used to show who is logged in currently

    const [ convos, setConvos ] = useState([]);
    const [ currentchat, setCurrentChat ] = useState(null);
    const [ msgs, setMsgs ] = useState([]);
    const [ newMsg, setNewMsg ] = useState("");

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
    
    useEffect(() => {
        const getUserMsgs = async () => {
            try{
                const res = await axios.get("/msgs/"+currentchat?._id);
                setMsgs(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getUserMsgs();
    },[ currentchat ]);

    // const msgInput = useRef();
    // convoId, senderId, text
    const handleSubmittingMsg = async (e) => {
        e.preventDefault();
        const msg = {
            convoId: currentchat._id,
            senderId: user._id,
            text: newMsg
        }
        try{
            const res = await axios.post("/msgs", msg);
            setMsgs([...msgs, res.data]); //add the newMSg posted to msgs useState which consst of array using
            // "...msgs" => which means it grabs all of the values that already exist in msgs
            setNewMsg(""); //wanna reset the newMsg values after sending it so it doesnt overlay
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
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
                                    <div key={c._id} onClick={(e) => {setCurrentChat(c)}}>
                                        <Convo key={c._id} convo={c} currentUser={user}/>
                                    </div>
                                ))
                                
                            }
                            
                        </div> 
                        <div className="convo">
                            {msgs.map((m) => (
                                <div key={m._id}>{m.text}</div>
                            ))}
                        </div>
                        <div id="stackBox">
                            <textarea className="sendMsgInput" type="text" 
                            onChange={(e)=>setNewMsg(e.target.value)}
                            value={newMsg}
                            ></textarea>
                            <button className="sendBtn" onClick={handleSubmittingMsg}><IoMdSend className="icon"/></button>
                        </div>
                    </Col>
                </Row> 
            </Container>
            </>
    );
}

export default Message;