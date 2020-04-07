import jobsSchema from '../schemas/jobs.schema';
import {model, Schema} from 'mongoose';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const jobSchema = new mongoose.Schema({
    userid: { type: String,trim:true ,index:true,required:true},
    driverid: { type: String,trim:true ,index:true,default:''},
    pickuplocation: { type: Object,trim:true},
    cartype: { type: String,enum:['economy','minivan','pro'],trim:true},
    destination: { type: Object,trim:true,index:true},
    destinationname:{type:String,trim:true},
    pickupname:{type:String,trim:true},
    isMatched: { type: String,enum:['pending','matched','missed','completed','cancelled','started'],default:'pending'},
    cancelledby: { type: String,enum:['','driver','client'],default:''}
},
{timestamps:true});

jobSchema.plugin(mongoosePaginate); 


const oderedjobs = model('incomingjobs', jobsSchema);
export default oderedjobs;
