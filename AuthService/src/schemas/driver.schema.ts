import { Schema} from "mongoose"
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const carSchema = new Schema({
    type:{type:String,enum:['','small','medium','large'],index:true},
    brand:{type:String,trim:true},
    carid:{type:String,trim:true,index:true}
});

const driverSchema = new Schema({
    firstname: { type: String,trim:true},
    lastname: { type: String,trim:true},
    email: { type: String,trim:true,index:true},
    phone: { type: String,trim:true,index:true},
    nin : { type: String,trim:true,index:true},
    profilepic: { type: String,trim:true,index:true},
    car:carSchema,
    isverified:{type:Boolean,default:false},
    isdeactivated:{type:Boolean,default:false},
    isdeleted:{type:Boolean,default:false}
},
{timestamps:true});

driverSchema.plugin(mongoosePaginate); 

export default driverSchema;