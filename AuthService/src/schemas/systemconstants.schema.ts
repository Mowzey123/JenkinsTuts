import { Schema} from "mongoose"
const mongoose         = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const systemconstSchema = new Schema({
    constant: { type: String,trim:true ,index:true},
    value: { type: String,trim:true,default:''},
    units: { type: String,trim:true,default:''},
    isdeleted: { type: Boolean,default:false},
},
{timestamps:true});

systemconstSchema.plugin(mongoosePaginate); 

export default systemconstSchema;