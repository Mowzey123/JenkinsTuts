import * as dotenv from "dotenv";
import * as path from 'path';

dotenv.config();
let workingpath: string =  path.resolve(__dirname).split('/build') [0];
    workingpath = workingpath +'/secretes/.env';

dotenv.config({ path: workingpath });


export const kafkaHost = process.env.kafkaHost;
export const kafkaport = process.env.kafkaport;
export const PORT = process.env.PORT;
export const recptionQueue = process.env.recptionQueue;
export const recGroupId = process.env.recGroupId
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const emailingrecptionQueue = process.env.emailingrecptionQueue;
export const mngusername = process.env.mngusername;
export const mngpassword = process.env.mngpassword;
export const SECRETE = process.env.mngpassword;
export const mongourl = process.env.mongourl;
export const mongoport = process.env.mongoport;
export const collection = process.env.collection;
export const twillioSID = process.env.twillioSID;
export const twillioAUTH = process.env.twillioAUTH;
export const twillioSMSSID = process.env.twillioSMSSID;

