import * as Config from '../config';
import winstonobj from './winstonLogger'
const twilio = require('twilio');

class twillioHelper{
    client:any;
    verificationservice = '';
    constructor() {
        this.client = new twilio(Config.twillioSID, Config.twillioAUTH);
    }

    createverifyTwillioSevice(){
        this.client.verify.services.create({friendlyName: 'MyOtpService'})
        .then((service:any) => {
            this.verificationservice = service.sid
        })
        .catch((err:any)=>{
            console.log(err)
        });
    }
    
    sendMessage(payload:{body:string,to:string,from:string}){
        this.client.messages.create({
            body: payload.body,
            to: payload.to, 
            from: payload.from 
        })
        .then((message:any) => console.log(message.sid))
        .catch((err:any)=>{});
    }

    sendVerificationToken(payload:{number:string,channel:string}){
        this.client.verify.services(Config.twillioSMSSID)
             .verifications
             .create({to: payload.number, channel: payload.channel})
             .then((verification:any) => { console.log(verification.status)} )
             .catch((err:any)=>{})
             ;
    }

    verifyToken(payload:{number:string,code:string},callback:any){
        this.createverifyTwillioSevice();
        // this.client.verify.services(this.verificationservice)
        // .verificationChecks
        // .create({to: payload.number, code: payload.code})
        // .then((verification_check:any) => {
        //     winstonobj.logWihWinston({msg:`${payload.number}  verification status `+verification_check.status},'SuccessLogs')
        //     callback(null,verification_check.status);
        // })
        // .catch((err:any)=>{
        //     winstonobj.logWihWinston({msg:`${payload.number}  verification status failed`,err:err},'ErrorLogs')
        //     callback(err,null);
        // });
    }
}
// access
const twillioHelperObj = new  twillioHelper();
export default twillioHelperObj;