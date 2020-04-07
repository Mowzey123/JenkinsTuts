import { Schema} from "mongoose"
const mongoose         = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const drivertoken = new Schema({
    driverid: { type: String,trim:true ,index:true,default:''},
    token: { type: String,trim:true,index:true},
    isonline: { type: Boolean,default:false},
},
{timestamps:true});

drivertoken.plugin(mongoosePaginate); 

export default drivertoken;