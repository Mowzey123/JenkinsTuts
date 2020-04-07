import {  NextFunction } from 'express';
const  jwt =  require("jsonwebtoken");
import {SECRETE} from '../config/';
const md5 = require('md5');
import portalClientApps from '../models/clientapps';

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
                req.body.userdata=verifiedJwt;
                next();
            }
          });
      }else{
        return res.status(401).json({msg:"Unauthorized",error:"Missing Authorization token"});
      }
  }


    checkAuth2(token:string,callback:any){
      if(token){
        const secrete = Buffer.from(SECRETE||'secrete', 'base64');
        jwt.verify(token,secrete,(err:any,verifiedJwt: any)=>{
            if(err){
              callback(true,null);
            }else{
              callback(false,verifiedJwt.id);
            }
          });
      }else{
        callback(true,null);
      }
    }

    isExpired(token:string):Boolean{
            const expiry = jwt.decode(token).exp;
            const now = new Date();
            return now.getTime() > expiry * 1000;
    }

    createNewTOken(){

    }

    createServicekey(client:any){
      const totoken = {
        email:client.email,
        id:client._id
      };
      const secrete = Buffer.from(SECRETE||'secrete', 'base64');
      const servicekey = md5(client.businesstype)+"|"+jwt.sign(totoken,secrete);
      return servicekey;
    }

    verfiyServiceAccess(req:any,res:any,next:NextFunction){
      portalClientApps.findOne({apikey:req.body.apiKey},(err:any,data:any)=>{
          if(err){ res.status(404).json({status:false,msg:"Unkown API key"})}
          if(!data){ res.status(404).json({status:false,msg:"Unkown API key"}) }
          if(data){
            next();
          }
      });
    }


}

const auth = new AuthClass();
export default auth;
