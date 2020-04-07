import * as dotenv from "dotenv";
import * as path from 'path';

dotenv.config();
let workingpath: string =  path.resolve(__dirname).split('/build') [0];

switch (process.env.NODE_ENV) {
  case "test":
    workingpath = workingpath +'/secretes/.env';
    break;
  case "production":
    workingpath = workingpath+'/secretes/.env';
    break;
  default:
    workingpath = workingpath+'/secretes/.env';
}
console.log(workingpath)
dotenv.config({ path: workingpath });


export const kafkaHost = process.env.kafkaHost;
export const kafkaport = process.env.kafkaport;
export const recptionQueue = process.env.recptionQueue;
export const recGroupId = process.env.recGroupId
export const outputQueue = process.env.outputQueue;
export const outputGroupId = process.env.outputGroupId;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const emailingrecptionQueue = process.env.emailingrecptionQueue;
export const emailingrecGroup = process.env.emailingrecGroup;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const frontendhost = process.env.frontendhost;
export const frontendport = process.env.frontendport;
export const supportemail = process.env.supportemail;
export const compamyname = process.env.compamyname;

