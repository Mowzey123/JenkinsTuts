import * as Config from '../config';
import winstonobj from './winstonLogger'
import producerObj from './kafka/producer';

class QueueingHelper{
    constructor() {
       
    }

    sendToEMailQueue(data:any){
    //send to emailing queue
        producerObj.sendToQueue(`${Config.emailingrecptionQueue}`,data,(err:any,res:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,msg:"Internal server error",Errlvl:"lvlthree",err:err},'ErrorLogs');   
            }else{
            // console.log({status:true,msg:"Send to email micro service"});
            winstonobj.logWihWinston({status:true,msg:"Send to email micro service"},'SuccessLogs');
            }
        });
    //send to emailing queue
    }

}
// access
const QueueingHelperObj = new QueueingHelper();
export default QueueingHelperObj;