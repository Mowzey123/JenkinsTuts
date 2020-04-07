import producerObj from '../helpers/kafka/producer';
import portalClient from '../models/clientmodel';
import portalClientuser from "../models/clientusermodel";
import minorObj from '../helpers/minor';
import validator from "../helpers/validators";
import * as Config from '../config';
import winstonobj from '../helpers/winstonLogger';
import {SECRETE} from '../config';
const  jwt =  require("jsonwebtoken");
import { Request, Response, Router } from 'express';
import QueueingHelperObj from "../helpers/queueuingHelpers";
import auth from "../helpers/auth";
import cognativeservices from "./helper";

class userMgtRouter{
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }


    // create client account
    signupClient(req:Request, res:Response): void {
        portalClient.findOne({ email: req.body.email }, (err:any, clientx:any) => {
            if (err) {  res.status(500).json({status:false,msg:"Internal server error",error:err});  }
            if (clientx){
                res.status(200).json({status:false,msg:"Email already in use"});
            }
            if(!clientx){
                const store =(minorObj.generateUUIDstring().substr(1,4)+req.body.companyname).replace(/\s/g, '');
                const newclient = new portalClient({email:req.body.email,password:minorObj.hashPassword(req.body.password),companyname:req.body.companyname,phonenumber:req.body.phone,store:store});
                newclient.save((err:any,saved:any)=>{
                    if(err){
                        winstonobj.logWihWinston({status:false,message:'failed to save company',err:err},'ErrorLogs')
                        res.status(200).json({status:false,msg:"Something went wrong,please try again later",Errlevel:"lvltwo"});
                    }else{
                        if(saved){
                            req.body.type='signup'
                            req.body.subject='Verfiy Email Notification'
                            const secrete = Buffer.from(SECRETE||'secrete', 'base64');
                            req.body.token = jwt.sign({userid:req.body.email,clientid:req.body.companyname},secrete,{expiresIn:86400});
                            QueueingHelperObj.sendToEMailQueue(req.body)
                            cognativeservices.saveSignedUpUserProfile({store:store,email:req.body.email,clientid:saved['_id'],firstname:req.body.firstname,lastname:req.body.lastname,role:"admin",phone:req.body.phonenumber,password:minorObj.hashPassword(req.body.password)})
                            res.status(200).json({status:true,msg:"Signup succesful,please check email for confirmation link"});
                        }else{
                            res.status(200).json({status:false,msg:"Something went wrong,please try again later",Errlevel:"lvltwo"});
                        }
                    }
                })
            }
        });
    }

    //add user profile to portal client account
    addUserProfile(req:Request, res:Response): void{  
        new Promise((resolve:any,reject:any)=>{
            portalClientuser.find({email:req.body.email},(err:any,data:any)=>{
                if(err){
                    reject(err)
                }else{
                    if(data.length==0){
                        const newuser = new portalClientuser({clientid:req.body.userdata.id,firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,role:req.body.role,phone:req.body.phone});
                        newuser.save((err:any,data:any)=>{
                            if(err){
                                reject(err);
                            }
                            if(data){
                                resolve(data);
                            }
                        });
                    }else{
                        reject({status:false,msg:'user already in use'});
                    }
                }
            }); 
        }).then((data:any)=>{
            const secrete = Buffer.from(SECRETE||'secrete', 'base64');
            const token = jwt.sign({userid:data._id,clientid:req.body.userdata.clientid},secrete,{expiresIn:86400});
            producerObj.sendToQueue(`${Config.emailingrecptionQueue}`,{companyname:req.body.userdata.companyname,role:req.body.role,email:req.body.email,firstname:req.body.firstname,lastname:req.body.lastname,token:token,type:'addportaluser',subject:"Cognative Fraud Portal Permission Granted"},((err:any,resp:any)=>{
                if(err){
                    res.status(200).json({status:false,msg:"Failed to send confirmation email but user profile added",Errlevel:"lvltwo"});
                }
                res.status(200).json({status:true,msg:"User profile created"});
            }));
        }).catch((err:any)=>{
            res.status(200).json({status:false,msg:"Failed to add user profile",Errlevel:"lvltwo",err:err});
        });
    }


    //editUserprofile
    editUserprofile(req:Request,res:Response):void{
        portalClientuser.findByIdAndUpdate(req.body.userdata.user,{firstname:req.body.firstname,lastname:req.body.lastname,role:req.body.role,phone:req.body.phone},{upsert:false},(err:any,data:any)=>{
              if(err){
                  res.status(200).json({status:false,msg:"Failed to update user profile",err:err});
              }
              if(data){
                  res.status(200).json({status:true,msg:"Profile updated"});
              }else{
                  res.status(200).json({status:false,msg:"User profile not found"});
              }
          });
    }

     //get team members
     getTeamUsers(req: Request, res:Response):void {
        portalClientuser.find({clientid:req.body.userdata.id},(err:any,data:any)=>{
            if(err){
                res.status(200).json({status:false,msg:"Failed to fetch team users",err:err});
            }else{
                res.status(200).json({status:true,msg:"Team users fetched",data:data});
            }
        });
    }

    //disable team user
    disableTeamUser(req: Request, res:Response):void {
        portalClientuser.findOneAndUpdate({_id:req.body.memberid},{active:false},(err:any,data:any)=>{
            if(err){
                res.status(200).json({status:false,msg:"Failed to find team member",err:err});
            }else{
                res.status(200).json({status:true,msg:"Team users fetched",data:data});
            }
        });
    }

    //reanable team member 
    enableTeamUser(req: Request, res:Response):void {
        portalClientuser.findOneAndUpdate({_id:req.body.memberid},{active:true},(err:any,data:any)=>{
            if(err){
                res.status(200).json({status:false,msg:"Failed to find team member",err:err});
            }else{
                res.status(200).json({status:true,msg:"Team users fetched",data:data});
            }
        });
    }


     //admin edit user profile
    adminEditUserprofile(req:Request,res:Response):void{
        portalClientuser.findByIdAndUpdate(req.body.userid,{firstname:req.body.firstname,lastname:req.body.lastname,role:req.body.role,phone:req.body.phone},{upsert:false},(err:any,data:any)=>{
              if(err){
                  res.status(200).json({status:false,msg:"Failed to update user profile",err:err});
              }
              if(data){
                  res.status(200).json({status:true,msg:"Profile updated"});
              }else{
                  res.status(200).json({status:false,msg:"User profile not found"});
              }
          });
    }

          //created routes
    routes(): void {
        this.router.post('/signupClient',validator.signupValidation,this.signupClient);
        this.router.post('/addUserProfile',auth.checkAuth,validator.addUserProfile,this.addUserProfile);
        this.router.post('/editUserprofile',auth.checkAuth,validator.editUserProfile,this.editUserprofile);
        this.router.post('/adminEditUserprofile',auth.checkAuth,validator.adminEditUserprofile,this.adminEditUserprofile);
        this.router.post('/getTeamUsers',auth.checkAuth,this.getTeamUsers);
        this.router.post('/disableTeamUser',auth.checkAuth,validator.disableTeamUser,this.disableTeamUser);
        this.router.post('/enableTeamUser',auth.checkAuth,validator.disableTeamUser,this.enableTeamUser)
    }

   
}
// access

const usermgtservicerouter = new userMgtRouter();
usermgtservicerouter.routes();
const usermgtrouter = usermgtservicerouter.router
export default usermgtrouter;