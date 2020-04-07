import {Schema} from 'mongoose';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cycledjobSchema = new Schema({
    userid: { type: String,trim:true ,index:true,required:true},
    driverid: { type: String,trim:true ,index:true,default:''},
    pickuplocation: { type: Object,trim:true},
    cartype: { type: String,enum:['economy','minivan','pro'],trim:true},
    destination: { type: Object,trim:true,index:true},
},
{timestamps:true});

cycledjobSchema.plugin(mongoosePaginate); 

const cycledjobs = mongoose.model('cycledjobs', cycledjobSchema);

export default cycledjobs;