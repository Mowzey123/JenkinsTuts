import { Schema} from "mongoose"
const mongoose         = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cycledjobSchema = new Schema({
    initjobid:{type:String,trim:true,index:true},
    userid: { type: String,trim:true ,index:true,required:true},
    driverid: { type: String,trim:true ,index:true,default:''},
    pickuplocation: { type: Object,trim:true},
    cartype: { type: String,enum:['economy','minivan','pro'],trim:true},
    destination: { type: Object,trim:true,index:true},
    destinationname:{type:String,trim:true},
    pickupname:{type:String,trim:true}
},
{timestamps:true});

cycledjobSchema.plugin(mongoosePaginate); 

export default cycledjobSchema;