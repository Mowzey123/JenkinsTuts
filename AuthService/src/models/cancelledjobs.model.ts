import {Schema} from 'mongoose';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cancelledJobsSchema = new Schema({
    userid: { type: String,trim:true ,index:true,required:true},
    driverid: { type: String,trim:true ,index:true,default:''},
    pickuplocation: { type: Object,trim:true},
    cartype: { type: String,enum:['economy','minivan','pro'],trim:true},
    destination: { type: Object,trim:true,index:true},
    cancelledby: { type: String,enum:['','driver','client'],default:''}
},
{timestamps:true});

cancelledJobsSchema.plugin(mongoosePaginate); 

const cancelledjobs = mongoose.model('cancelledjobs', cancelledJobsSchema);

export default cancelledjobs;