import * as Config from "./config";
import kafkaConsumer from './helpers/kafka/consumer';
import sendgridobj from './helpers/sendGrid';
import * as emailTemplates from './helpers/emailtemplates';
import winstonobj from './helpers/winstonLogger';

class emailingMicroservice{
    
    constructor() {
        this.recieveFromQueue();
    }
  
    recieveFromQueue():void{
        const inQue = new kafkaConsumer(`${Config.emailingrecptionQueue}`,{kafkaHost: `${Config.kafkaHost}:${Config.kafkaport}`,groupId: `${Config.emailingrecGroup}`});
        inQue.listenToQueue((err:any,message:any)=>{
            if(err){
                winstonobj.logWihWinston(err,'ErrorLogs');
            }else if(message){
                message=JSON.parse(message);
                let msg = {to:message.email,from: Config.supportemail||'',subject: message.subject,html: '',text:'testing'};
                switch(message.type){

                    case 'signup':
                        msg.html = emailTemplates.registrationEmail({email:message.email,token:message.token,firstname:message.firstname});
                    break;

                    case 'adminrights':
                        msg.html = emailTemplates.adminrights({temporarypassword:message.temporarypassword,role:message.role,email:message.email,token:message.token,firstname:message.firstname});
                    break;
                    case 'passwordresset':
                        msg.html = emailTemplates.passwordresset({temporarypassword:message.temporarypassword,email:message.email,token:message.token,firstname:message.firstname});
                    break;                    
                    default:
                    break;
                }
                if((msg.html!='')&&(msg.to!='')){
                    sendgridobj.sendEmailModule(msg);
                }else{
                    winstonobj.logWihWinston({status:false,msg:"Missing important fields",Errlevel:"lvlfour"},'ErrorLogs');
                    // console.log();
                }
            }
        });
    }
}

const emailingobj = new emailingMicroservice();
export default emailingobj;