import { Schema} from "mongoose"
const mongoose         = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
    email: { type: String,trim:true ,index:true},
    password: { type: String,trim:true ,index:true},
    firstname: { type: String,trim:true},
    lastname: { type: String,trim:true},
    profilepic:{type:String,trim:true},
    phone: { type: String,trim:true,index:true},
    emailingtoken:{ type: String,trim:true,require:true},
    isdeactivated: { type: Boolean,default:false},
    isverified: { type: Boolean,default:false},
},
{timestamps:true});

userSchema.plugin(mongoosePaginate); 

export default userSchema;