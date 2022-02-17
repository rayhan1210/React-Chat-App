const mongoose = require("mongoose");

//what each user should have
const MsgSchema = new mongoose.Schema({
        convoId: { // which conversation are you in, hence you need conversation id
            type: String
        },
        senderId: { //which user you are you sending the message to
            type: String
        },
        text: { //and the message content.
            type: String
        }
    },
    {
        timestamps: true
    }

);

//export this schema for it to be used by other component.
//module.exports = mongoose.model(<modelname>, <schema name>);
module.exports = mongoose.model("Msg", MsgSchema);