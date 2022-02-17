const mongoose = require("mongoose");

//what each user should have
const ConvSchema = new mongoose.Schema({
        members: { //will contain sender and receiver id and by using convo id you fetch the 
            // convo you are having with others.
            type:Array
        }
    },
    {
        timestamps: true
    }

);

//export this schema for it to be used by other component.
//module.exports = mongoose.model(<modelname>, <schema name>);
module.exports = mongoose.model("Convo", ConvSchema);