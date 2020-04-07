import { Schema} from "mongoose"
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const jobratingSchema = new Schema({
    jobid: { type: String,trim:true},
    userid: { type: String,trim:true,index:true},
    driverid: { type: String,trim:true,index:true},
    rating:{type:Number,required:true}
},
{timestamps:true});

jobratingSchema.plugin(mongoosePaginate); 

export default jobratingSchema;