import mongoose from "mongoose";
const UsersSchema = new mongoose.Schema({
    username:{
        "type":"String",
        "required":false
    },
     password:{
        "type":"String",
        "required":true
    },
     email:{
        "type":"String",
        "required":true
    }

})

export default mongoose.model("User",UsersSchema,"Users")