const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const userRoute = require("./roots/users");
const authRoute = require("./roots/auth");

const app = express(); // create the application

dotenv.config(); //using dotenv
//process.env.MONGO_URL => calling the secret key from .env file
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
    console.log("checing mongoDB connection");
}); //connecting mongoDB

//middleware implementation
app.use(express.json()) //express.json is abody parser when making a post request
app.use(helmet());
app.use(morgan("common"));

// app.get("/", (req, res)=> {
//     res.send("Chat app homepage");
// })

// app.get("/Chat", (req, res) => {
//     res.send("Chat app Chat page");
// })

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(8800, ()=>{
    console.log("Testing backend server, other");
});
