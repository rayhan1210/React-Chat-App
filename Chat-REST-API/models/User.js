const mongoose = require("mongoose");

//what each user should have
const user_Schema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        profilePicture: {
            type: String,
            default: ""
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        desc: {
            type: String,
            max: 50
        },
        from: {
            type: String,
            max: 50
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3]
        }

    },
    {
        timestamps: true
    }

);

//export this schema for it to be used by other component.
//module.exports = mongoose.model(<modelname>, <schema name>);
module.exports = mongoose.model("User", user_Schema);