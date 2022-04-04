const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); //async funtion


// router.get("/", (req, res)=>{
//     res.send("in auth page");
// });
 

//register user
router.post("/register", async (req, res)=>{ //async function
    // res.send("OK")
    try{
        // generate new password
        const salt = await bcrypt.genSalt(10); // random string that makes the hash unpredictable
        const pw_Hashed = await bcrypt.hash(req.body.password, salt)
        //new user created
        const new_user = new User({
            username: req.body.username,
            email: req.body.email,
            password: pw_Hashed,
        });
        //save the user and respond
        const user = await new_user.save();
        res.status(200).json(user); //successful
    }catch(err){
        res.status(500).json(err);  
    }
});

//login user 

router.post("/login", async (req, res) => {

    try{
        const user = await User.findOne({
            username: req.body.username
        });
        !user && res.status(404).json("user not fund");

        const checkPW = await bcrypt.compare(req.body.password, user.password);
        !checkPW && res.status(404).json("wrong password");

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;