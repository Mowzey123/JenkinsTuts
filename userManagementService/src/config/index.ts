import * as dotenv from "dotenv";
import * as path from 'path';

let workingpath: string =  path.resolve(__dirname).split('/build') [0];
workingpath = workingpath+'/secrets/.env';
dotenv.config({ path: workingpath });

export const kafkaHost = process.env.kafkaHost;
export const kafkaport = process.env.kafkaport;
export const recptionQueue = process.env.recptionQueue;
export const recGroupId = process.env.recGroupId
export const outputQueue = process.env.outputQueue;
export const outputGroupId = process.env.outputGroupId;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const emailingrecptionQueue = process.env.emailingrecptionQueue;
export const SECRETE = process.env.SECRETE;
export const mongourl = process.env.mongourl;
export const mongoport = process.env.mongoport;
export const collection = process.env.collection;
export const mngusername = process.env.mngusername;
export const mngpassword = process.env.mngpassword;
export const PORT = process.env.PORT;
