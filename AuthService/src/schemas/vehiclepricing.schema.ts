import { Schema} from "mongoose"
const mongoose         = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const vehiclepricingscema = new Schema({
    type: { type: String,enum:['','minivan','pro','economy']},
    priceperkm: { type: Number,trim:true,default:0},
    waitingpriceperminute: { type: Number,trim:true,default:0},
    basefare: {type:Number,required:true},
    isdeleted: { type: Boolean,default:false},
},
{timestamps:true});

vehiclepricingscema.plugin(mongoosePaginate); 

export default vehiclepricingscema;