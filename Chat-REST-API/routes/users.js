const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const user = require("../models/User");

//update user, /:id +> allows to chooe an id
router.put("/:id", async (req, res) => {
    //params.id points to "/:id"
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body, //automatically set all the input inside the body 
            });
            res.status(200).json("Account is updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only update your own account");
    }
});
//delete user
router.delete("/:id", async (req, res) => {
    //params.id points to "/:id"
    if(req.body.userId == req.params.id || req.body.isAdmin){
        console.log("userId: " + req.body.userId);
        console.log("paramas id: " + req.params.id);
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account is deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your own account");
    }
});
//get user "/:id" cause you wanna find user by the id
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        // const user = await User.findById(req.params.id);
        // const {password, updatedAt, ..other} = user._doc 
        // _doc carries the whole object and by sending other you get everything except password and updated at
        //only get userid and username attributes
        // const user = await User.find({"userId": req.params.id}).select('username').select('email'); 
        const user = userId
        ? await User.findById(userId)
        : await User.findOne({username: username});
        const { password, updateAt, ...other } = user._doc;
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});
//follow user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.include(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {following: req.body.userId}});
                res.status(200).json("followed successfully");
            }else{
                res.status(403).json("you follow this user")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cant follow yourself");
    }
});

//unfollow
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.include(req.body.userId)){
                await user.updateOnde({$pull: {followers: req.body.userId}});
                await currentUser.updateOnde({$pull: {following: req.body.userId}});
                res.status(200).json("unfollowed successfully");
            }else{
                res.status(403).json("you unfollow this user")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cant unfollow yourself");
    }
});
module.exports = router;