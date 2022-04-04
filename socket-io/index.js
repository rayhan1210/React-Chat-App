const io = require("socket.io")(8900, {
    cors:{
        origin:"http://localhost:3000",
    },
});

let users = []; // hold userid and socketids

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId ); //delete array
};  

const getUser = (userId) => {
    return users.find(user => user.userId == userId);
}

io.on("connection", (socket)=> {
    console.log("User connected")
    // io.emit("welcome", "Hello from the socket side")
    socket.on("addUser", (userId) => { 
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //Send and get messages
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
         console.log("in socket: " + user.socketId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    //when disconnect such as closing browser
    socket.on("disconnect", () => {
        console.log("disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});