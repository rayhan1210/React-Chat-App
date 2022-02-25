const router = require("express").Router();
const User = require("../models/User");
const Msg = require("../models/Msg");


// add -> start a new convo 
router.post("/", async (req, res) => {
    // const textMsg = req.body.text;
    try{
        const newMsg = new Msg(req.body); 
        //req.body -> everything in the body ->convoId,senderId, tex.
        // const textMsg = req.body.text;

        // console.log(newMsg);
        // !newMsg && res.status(404).json("cant find convo");
        await newMsg.save();
        res.status(200).json(newMsg);
    }catch(err){
        res.status(500).json(err);
    }

});
// get a message from receiver.

router.get("/:convoId", async (req, res) => {
    try{
        const getMsg = await Msg.find({
            convoId: req.params.convoId
        });
        // console.log(req.body.convoId);
        // !getMsg && res.status(404).json("cant find convo");
        // console.log(getMsg);
        res.status(200).json(getMsg);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;