import winstonobj from '../helpers/winstonLogger';
import portalClientuser from '../models/clientusermodel';
import apikeysobj from "../helpers/apikey";
import portalClientApps from '../models/clientapps';
import dbhelperobj from '../helpers/dbhelpers';

class CognativeServices{

    
    constructor() {
        
    }

    saveSignedUpUserProfile(data:any){            
        const userdata = new portalClientuser({
                email:data.email,
                password:data.password,
                firstname:data.firstname,
                lastname:data.lastname,
                clientid:data.clientid,
                verified:false,
                active:true,
                role:"admin",
                phone:data.phone,
            });
            userdata.save((err:any,sav:any)=>{
                if(err){
                    winstonobj.logWihWinston({status:false,msg:"Failed to create team users",err:err},'ErrorLogs');
                }else{
                    this
                    winstonobj.logWihWinston({status:true,msg:"Saved new team user"},'SuccesLogs');
                }
            })
            this.generateCleintApiKey(data.clientid,data.email)
            this.createNewClientDb(data.store)
    }

    //Regenerate client API keys
    generateCleintApiKey = (clientid:string,useremail:string) => {
        const newkey =apikeysobj.setAPIKey({hashedtoken:clientid,email:useremail});
        portalClientApps.findOneAndUpdate({clientid:clientid},{apikey:newkey},{upsert:true},(err:any,data:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,msg:"Failed to create api key",err:err},'ErrorLogs');
            }else{
                winstonobj.logWihWinston({status:true,msg:"Saved new api key"},'SuccesLogs');
            }
        });
    }

    //create db for new client
    createNewClientDb = (db:string) => {
        dbhelperobj.createCollection(db,(result:any)=>{
            if(result.status){
                winstonobj.logWihWinston({status:true,msg:"client db updated"},'SuccessLogs');
            }else{
                winstonobj.logWihWinston({status:false,msg:"Failed to create client collection",Errlvl:"lvlthree"},'ErrorLogs');
            }
        });
    }
    //create db for new client

}

const cognativeservices = new CognativeServices();
export default cognativeservices;