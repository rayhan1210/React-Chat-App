const router = require("express").Router();
const User = require("../models/User");
const Convo = require("../models/Convo");


// For conversations you need:
// post convos to database 
// 
// "/" main url
router.post("/", async (req, res) => {
    const newConvo = new Convo({
        members: [req.body.senderId, req.body.receiverId]
    });
    try{
        const savedConvos = await newConvo.save();
        res.status(200).json(savedConvos);
    }catch(err){
        res.status(500).json(err);
    }
});
// also get conversations of a user from database
router.get("/:userId", async (req, res) => {
    try{
        
        const getConvo = await Convo.find({
            members: { $in: [req.params.userId] } //a condition -> members: { $in: [req.params.userId] }
        })
        res.status(200).json(getConvo);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;