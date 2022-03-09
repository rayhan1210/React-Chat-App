import { Container, Row, Col } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contextapi/Auth_Context"
import { io } from "socket.io-client";
import Convo from "./Convos";
import "./message.css";
import axios from "axios";
import Chat from "./Chat";

function Message() { 
    const{ user } = useContext(AuthContext);
    //later user will be used to show who is logged in currently
    const [ convos, setConvos ] = useState([]); //gets the list of conversations
    const [ currentchat, setCurrentChat ] = useState(null);
    const [ msgs, setMsgs ] = useState([]);
    const [ newMsg, setNewMsg ] = useState("");
    const [ arrivedMsg, setArrivedMsg ] = useState(null);
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", userData => {
            setArrivedMsg({
                senderId: userData.senderId,
                text: userData.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        // console.log("arrivedMsg.sender: " + arrivedMsg);
        arrivedMsg && 
            currentchat?.members.includes(arrivedMsg.senderId) && 
            setMsgs((prev) => [...prev, arrivedMsg]);
    }, [ arrivedMsg, currentchat ]);


    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            console.log(users); //fro debugging
        })
    }, [user])

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
        };

        const receiver_Id = currentchat.members.find(member => member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiver_Id,
            text: newMsg,
        });

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
        <Container className="messenger-box2">
            <Row>
                <Col className='messenger d-flex mt-5'>
                    <div className="convo-sideBar">
                        <input placeholder="Search user" className="searchUser"/>
                        <div>
                            {   
                            // {/* // is instead {} use () it returns it without having to type return */}
                                convos.map((c) => (
                                    <div className="seperateConvo" key={c._id} onClick={(e) => {setCurrentChat(c)}}>
                                        <Convo key={c._id} convo={c} currentUser={user}/>
                                    </div>
                                ))
                                
                            }
                            
                        </div> 
                    </div>
                    <div className="convo-box">
                        <div className="convo">
                            {msgs.map((m) => (
                                <Chat key={m._id} message={m} own={m.senderId===user._id} />
                            ))}        
                        </div>
                        <div class="input-group mb-3 msgButton">
                            <textarea type="text" class="form-control sendMsg" placeholder="Send message" aria-label="Send message" aria-describedby="basic-addon2"
                                onChange={(e)=>{setNewMsg(e.target.value)}}
                                //set new msg when user types
                                value={newMsg}
                            />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" onClick={handleSubmittingMsg}>Button</button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row> 
        </Container> 
        </>
    );
}

export default Message;