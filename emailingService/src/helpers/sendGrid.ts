const sgMail = require('@sendgrid/mail');
import {SENDGRID_API_KEY} from '../config';
import winstonobj from './winstonLogger';
sgMail.setApiKey(SENDGRID_API_KEY);
const sendmail = require('sendmail')();

class sendGrid{

    constructor(){
    }

    sendEmail(msg:{to:string|Array<string>,from:string,subject:string,text:any,html:any}){
        sgMail.send(msg,(err:any, result:any)=>{
            if(err){
                // winstonobj.logWihWinston({status:false,msg:"Failed to send  sendgrid email",Errlvl:"lvlfour",payload:msg},'ErrorLogs');
                // console.log({status:false,msg:"Failed to send  sendgrid email",Errlvl:"lvlfour",payload:msg}); 
                this.sendEmailModule(msg);
            }else{
                winstonobj.logWihWinston({status:true,msg:"Sent email",payload:msg},'OutGoingEmails');
                // console.log();
            }
        });
    }

    sendEmailModule = (msg:{to:string|Array<string>,from:string,subject:string,text:any,html:any})=>{
        let tos :any = '';
        if((typeof msg.to) == 'string'){
            tos = msg.to
        }else{
            const tom:any = msg.to;
            if(tom.length=1){
                tos = tom[0];
            }else{
                tom.forEach((element:string) => {
                    tos+= ', '+element; 
                });
            }
        }
        sendmail({
            from: msg.from,
            to: tos,
            subject: msg.subject,
            html: msg.html,
          }, (err:any, reply:any)=>{
              if(err){
                winstonobj.logWihWinston({status:false,msg:"Failed to send  email",Errlvl:"lvlfour",err:err},'ErrorLogs');
              }else{
                winstonobj.logWihWinston({status:true,msg:"Sent email",payload:reply},'OutGoingEmails');
              }
        });
    }

}

const sendgridobj = new sendGrid();
export default sendgridobj;