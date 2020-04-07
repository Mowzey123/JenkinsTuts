import { Request, Response,Router} from 'express';
import minorObj from '../helpers/minor';
import winstonobj from '../helpers/winstonLogger';
import {SECRETE} from '../config';
import appUsers from '../models/user.model';
import validator from '../helpers/validators.helpers';
import jwtHelperObj from "../helpers/jwt.helper"
import adminUsers from '../models/admin.model';
import auth from '../helpers/auth';
import * as passport from "passport";
import { IVerifyOptions } from "passport-local";

const  jwt =  require("jsonwebtoken");

class authRouter{
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
        // this.createSuperUser()
    }

    adminSignIn(req:Request,res:Response){
        passport.authenticate("local", (err: Error, user: any, info: IVerifyOptions) => {
            if (err) { res.status(500).json({status:false,msg:"Internal Server error",error:err}); }
            if(info.message=='inactive'||info.message=="notverified"){
                if(info.message=='notverified'){
                    res.status(200).json({status:false,msg:"Email address not verified"})
                }
                if(info.message=='inactive'){
                    res.status(200).json({status:false,msg:"Account is inactive"})
                }
            }else{
                if (user) {
                    req.logIn(user, (err: any) => {
                        if (err) { res.status(500).json({status:false,msg:"Internal Server error",error:err}); }
                        else{
                       
                            const totoken = {
                                email:user.email,
                                firstname:user.firstname,
                                lastname:user.lastname,
                                userid:user._id,
                                role:user.role,
                            };
                            const secrete = Buffer.from(SECRETE||'secrete', 'base64');
                            const token = jwt.sign(totoken,secrete,{expiresIn:1800});
                            console.log(token)
                            res.status(200).json({status:true,"message":"authorized", token:token})
                        }
                    });
                }else{
                    res.status(200).json({status:false,msg:"Invalid email or password"});
                }
            }
          })(req, res);
    }
    
    //have no mobile app signin
    mobileAppEmailSignIn(req:Request,res:Response){
        
    }//have no mobile app signin

    renewAuthKey(req:Request,res:Response){
        if(req.headers.authorization){
            const headers = req.headers.authorization||'';
            const token = headers.split(" ");
            const secrete = Buffer.from(SECRETE||'secrete', 'base64');
            jwt.verify(token[1], secrete, (err:any, decoded:any) => {
                    if(err){ res.status(401).json({status:false,"msg":"Couldn't refresh token",err:err})}
                    else{
                        delete req.body.userdata['iat']
                        delete req.body.userdata['exp']
                        const token = jwt.sign(req.body.userdata,secrete,{expiresIn:1800});
                        res.status(200).json({"message":"new auth token", newtoken:token})
                    }
            });
        }else{
            res.status(400).json({status:false,message:"Missing authorization header"})
        }
    }

    //create  super user
    createSuperUser = () => {
        const newadmin = new adminUsers({email:"admin@carosa.co",password:minorObj.hashPassword("123456"),role:"superadmin",firstname:"Admin",lastname:"Admin",isverified:true});
        newadmin.save((err:any,data:any)=>{
            if(err){
                console.log({status:false,err:err});
            }else{
                console.log({status:true,data:data});
            }
        });
    }

    routes(): void {
        this.router.post('/renewAuthToken',auth.checkAuth,this.renewAuthKey);
        this.router.post('/adminSignIn',validator.adminSignIn,this.adminSignIn);
    }

}
// access
const authRouterObj = new authRouter();
authRouterObj.routes();
export default authRouterObj.router;