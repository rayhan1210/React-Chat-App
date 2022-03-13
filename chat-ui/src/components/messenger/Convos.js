import axios from "axios";
import { useEffect, useState } from "react";
import "./convo.css";

export default function Convo({convo, currentUser, list}){
    const [user, setUser ] = useState();

    useEffect(() => {
        const userFriendsId = convo.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try{
                const res = await axios("/users?userId="+userFriendsId);
                setUser(res.data);
                // console.log(res);
            }catch(err){
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, convo]);

    return (
        // design it
        <b className={list ? "convoID": "displayAsText"}>{user?.username}</b>
    );
}