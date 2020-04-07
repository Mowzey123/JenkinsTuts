import {  NextFunction } from 'express';
const  jwt =  require("jsonwebtoken");
import {SECRETE} from '../config/';
import "../config/passport";
import adminUsers from '../models/admin.model';
import winstonobj from './winstonLogger';

class AuthClass{
  apiKeys:any;
    constructor(){
    }

    checkAuth(req:any,res:any,next:NextFunction){
      if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        const secrete = Buffer.from(SECRETE||'secrete', 'base64');
        jwt.verify(token,secrete,function(err:any,verifiedJwt: any){
            if(err){
              return res.status(401).json({msg:"Unauthorized",error:err});
            }else{
              adminUsers.findOne({_id:verifiedJwt.userid},{isdeactivated:1},(err:any,results:any)=>{
                  if(err){
                      winstonobj.logWihWinston({status:false,message:"failed to check on deactive status"},"ErrorLogs")
                      res.status(500).json({status:false,message:"Something went wrong"})
                  }else{
                    if(results.deactive){
                      res.status(200).json({status:false,message:"User account deactivated"})
                    }else{
                      req.body.userdata=verifiedJwt;

                      next()
                    }
                  }
              });
            }
          });
      }else{
        return res.status(401).json({msg:"Unauthorized",error:"Missing Authorization token"});
      }
  }

  isExpired(token:string):Boolean{
          const expiry = jwt.decode(token).exp;
          const now = new Date();
          return now.getTime() > expiry * 1000;
  }

}

const auth = new AuthClass();
export default auth;
