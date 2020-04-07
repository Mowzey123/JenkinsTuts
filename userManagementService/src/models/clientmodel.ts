import { Schema, model, Model,Document } from "mongoose";

interface IPortalclient extends Document {
    email: string;
    password: number;
    hashedtoken: string;
    companyname: number;
    verified:Boolean;
    noofemployees:string;
    getPublicFields():Object;
};

const clientSchema = new Schema({
    email: { type: String, required: true,unique:true,index:true},
    password: { type: String, required: true,trim:true },
    verified: {type: Boolean, default:0},
    companyname: { type: String,trim:true },
    noofemployees:{type:String,trim:true},
    phonenumber:{type:String,trim:true},
    store:{type:String,trim:true},
},
{timestamps:true});


clientSchema.methods.getPublicFields = function () {
    var returnObject = {
        email: this.email,
        hashedtoken: this.hashedtoken,
    };
    return returnObject;
};
const portalClient:Model<IPortalclient> = model<IPortalclient>('portalClients', clientSchema);
export default portalClient;