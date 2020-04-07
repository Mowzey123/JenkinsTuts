import { Schema, model } from "mongoose";

const burealAppSchema = new Schema({
    clientid: { type: String, required: true,index:true,unique:true},
    apikey: { type: String, required: true,trim:true,unique:true,index:true }
},
{timestamps:true}
);


const burealApps = model('burealapps', burealAppSchema);
export default burealApps;