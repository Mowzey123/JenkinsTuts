import { Schema} from "mongoose"
const mongoose         = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const adminSchema = new Schema({
    email: { type: String,trim:true ,index:true},
    password: { type: String,trim:true},
    firstname: { type: String,trim:true},
    lastname: { type: String,trim:true},
    phone: { type: String,trim:true,index:true},
    role:{type:String,enum:['','admin','superadmin']},
    emailingtoken:{ type: String,trim:true,require:true},
    isdeactivated: { type: Boolean,default:false},
    isverified: { type: Boolean,default:false},
    addedby:{type:String,trim:true,default:''}
},
{timestamps:true});

adminSchema.plugin(mongoosePaginate); 

export default adminSchema;