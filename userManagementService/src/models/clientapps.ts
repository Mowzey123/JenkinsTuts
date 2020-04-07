import { Schema, model } from "mongoose";

const clientAppSchema = new Schema({
    clientid: { type: String, required: true,index:true,unique:true},
    apikey: { type: String, required: true,trim:true,unique:true,index:true }
},
{timestamps:true}
);


const portalClientApps = model('clientapps', clientAppSchema);
export default portalClientApps;