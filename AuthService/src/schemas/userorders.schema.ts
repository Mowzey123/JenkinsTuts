import { Schema} from "mongoose"
const mongoose         = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userordersSchema = new Schema({
    userid: { type: String,trim:true ,index:true},
    driverid: { type: String,trim:true ,index:true},
    starttime: { type: String,trim:true},
    endtime: { type: String,trim:true},
    fee: { type: String,trim:true},
    status: {type:String,enum:['','cancelled','open','closed']}
},
{timestamps:true});

userordersSchema.plugin(mongoosePaginate); 

export default userordersSchema;