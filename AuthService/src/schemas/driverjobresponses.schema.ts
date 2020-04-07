import { Schema} from "mongoose"
const mongoose         = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const driverjobresponseSchema = new Schema({
    driverid: { type: String,trim:true ,index:true},
    jobid: { type: String,trim:true,index:true},
    status: { type: String,enum:[true,false,'missed'] },
},
{timestamps:true});

driverjobresponseSchema.plugin(mongoosePaginate); 

export default driverjobresponseSchema;