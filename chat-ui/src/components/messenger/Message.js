import { Container, Row, Col } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextapi/Auth_Context"
// "../contextapi/Auth_Context";
import Convo from "./Convos";
import "./message.css";
import axios from "axios";
import Chat from "./Chat";

function Message() {
    const{ user } = useContext(AuthContext);
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
            <Row>
                <Col className='messenger d-flex mt-5'>
                    <input placeholder="Search user" className="searchUser"/>
                    <div className="convoList">
                        {   
                        // {/* // is instead {} use () it returns it without having to type return */}
                            convos.map((c) => (
                                <div className="seperateConvo" key={c._id} onClick={(e) => {setCurrentChat(c)}}>
                                    <Convo key={c._id} convo={c} currentUser={user}/>
                                </div>
                            ))
                            
                        }
                        
                    </div> 
                    <div className="convo">
                        {msgs.map((m) => (
                            <Chat key={m._id} message={m} own={m.senderId===user._id} />
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