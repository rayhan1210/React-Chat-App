import axios from "axios";
import { useEffect, useState } from "react";
import "./chat.css";

export default function Chat({message, own}) {
    const [user, setUser ] = useState();

    useEffect(() => {
        const getUser = async () => {
            try{
                const res = await axios("/users?userId="+message.senderId);
                setUser(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getUser();
    },[message.senderId]);

    return (
        <div className={own ? "message own" : "message other"}>
            {/* {console.log(user)}
            <p className={own ? "message own" : "message other"}> </p> */}
            {/* <span className="dot"></span> */}
            <p className={own ? "messageText own arrow-right" : "messageText other arrow-left"} key={message._id}>{message.text}</p>
        </div>
    );
}

// export default Chat;