import { Schema, model, Model,Document } from "mongoose";

interface IPortalclientuser extends Document {
    firstname: string;
    clientid:string;
    lastname: number;
    phone: string;
    role:string,
    email: number;
    password:string;
    verified:Boolean;
};

const cleintuserSchema = new Schema({
    clientid:{type:String,required:true,trim:true ,index:true},
    firstname:{ type: String, required: true,trim:true},
    lastname:{ type: String, required: true,trim:true},
    phone:{ type: String, required: true,trim:true},
    email: {type:String,required:true,trim:true,index:true},
    role:{ type: String, required: true,enum:['admin','superadmin'],index:true},
    password:{type:String,trim:true,required:true},
    verified:{type:Boolean,default:0,index:true},
    active:{type:Boolean,default:1,index:true},
},
{timestamps:true}
);

const portalClientuser:Model<IPortalclientuser> = model<IPortalclientuser>('portalClientusers', cleintuserSchema);
export default portalClientuser;
