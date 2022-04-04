import { Container, Row, Col } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contextapi/Auth_Context"
import { io } from "socket.io-client";
import Convo from "./Convos";
import "./message.css";
import axios from "axios";
import Chat from "./Chat";
// import GetWindowSize from "../../WindowSizeHook";

function Message() { 
    const{ user } = useContext(AuthContext);
    //later user will be used to show who is logged in currently
    const [ convos, setConvos ] = useState([]); //gets the list of conversations
    const [ currentchat, setCurrentChat ] = useState(null);
    const [ msgs, setMsgs ] = useState([]);
    const [ newMsg, setNewMsg ] = useState("");
    const [ arrivedMsg, setArrivedMsg ] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    let classChooser = null;
    // 
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    //
    //get the updated window size each time window size changes using useeffect hook which performs for each render of the component
    useEffect(() => {
        function handleResize(){
            setWindowSize({
                width: window.outerWidth,
                height: window.outerHeight
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    },[]);

    //
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
    }, [user]);

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
            // "...msgs" => which means it will grab all of the values that already exist in msgs
            setNewMsg(""); //wanna reset the newMsg values after sending it so it doesnt overlay
        }catch(err){
            console.log(err);
        }
    }
    //
    const changer = () => {
        if((windowSize.width <= 768 && windowSize.width >= 320) && (!currentchat || currentchat)){
            classChooser = "hide-convo-box"
        }else{
            classChooser = "show-all"
        }
        if((windowSize.width <= 768 && windowSize.width >= 320) && currentchat){
            classChooser = "hide-side-bar"
        }
    }
    const handleGoBack = () => {
        classChooser = "show-all";
        console.log("clicked");
    }
     //creating auto scroll to bottom of page
     useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"}) //produces smoother animation when scroll bar goes to bottom upon refresh or seding new msg
    },[msgs]);
    return (
        <>
        {changer()}
        <Container className={ classChooser === "show-all" ? 'messenger-box2 d-flex justify-content-center' : "" ||
            classChooser === "hide-convo-box" ? 'messenger-box2-decrese d-flex mt-2 justify-content-center' : 'messenger-box2 d-flex justify-content-center' ||
            classChooser === "hide-side-bar" ? 'messenger-box2-extend d-flex mt-2 justify-content-center' : 'messenger-box2 d-flex justify-content-center'
            }>
            <Row>
                <Col className={'messenger d-flex mt-2'}>
                    <div className={classChooser === "show-all" ? 'convo-sideBar' : ""  ||
                        classChooser === "hide-convo-box" ? "convo-sideBar-extend" : "convo-sideBar" || 
                        classChooser === "hide-side-bar" ? "convo-sideBar-hide" : "convo-sideBar"}>
                        <input placeholder="Search user" className={classChooser === "hide-convo-box" ? "searchUser-extend" : "searchUser"}/>
                        <div className="set-conv">
                            {   
                            // {/* // is instead {} use () it returns it without having to type return */}
                                convos.map((c) => (
                                    <div className="seperate-convo" key={c._id} onClick={(e) => {setCurrentChat(c)}}>
                                        <Convo key={c._id} convo={c} currentUser={user} list={true} barExtender={classChooser}/>
                                    </div>
                                ))    
                            }
                            
                        </div> 
                    </div>
                    { 
                        currentchat ? 
                            <div className={'msg-box'}>
                                <div className="msgHeader">
                                    {classChooser === "hide-side-bar" ? 
                                        <button className="goBackBtn" onClick={() => {
                                            console.log("clicked")
                                        }}>&#8678;</button>
                                    : ""}
                                    {/* <button className={classChooser === "hide-side-bar" ? "bg-light goBackBtn" : "goBackBtn"}>&#8678;</button> */}
                                    <Convo list={false} key={currentchat._id} convo={currentchat} currentUser={user} barExtender={classChooser}/>
                                    <span className="chatmenu">&#8942;</span>
                                </div>
                                <div className={classChooser === "hide-side-bar"?"convo-decrease" : "convo"}>
                                    {msgs.map((m) => (
                                        <div ref={scrollRef} key={m._id} className="scroller">
                                         <Chat key={m._id} message={m} own={m.senderId===user._id} />
                                        </div>
                                    ))}        
                                </div>
                                <div className="input-group mb-3 msgButton">
                                    <textarea type="text" className="sendMsg" placeholder="Send message" aria-label="Send message" aria-describedby="basic-addon2"
                                        onChange={(e)=>{setNewMsg(e.target.value)}}
                                        //set new msg when user types
                                        value={newMsg}
                                    />
                                    <div className="input-group-append">
                                        <button className="send-btn" type="button" onClick={handleSubmittingMsg}>&#10148;</button>
                                    </div>
                                </div>
                            </div>
                        :  
                            <div className={classChooser === "hide-convo-box" ? "NoChatChoosen-minimize" : "NoChatChoosen"}></div>
                    }
                </Col>
            </Row> 
        </Container> 
        </>
    );
}

export default Message;