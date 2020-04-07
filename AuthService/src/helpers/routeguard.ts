import { Request, Response,Router} from 'express';
import { NextFunction } from 'connect';

class routeGuard{

    constructor(){
        
    }

    superAdminGaurd(req:Request,res:Response,next:NextFunction){
        if(req.body.userdata.role='superadmin'){
                next();
        }else{
            res.status(200).json({status:false,messsage:"You dont have permissions to perform this request"});
        }
    }

    adminGaurd(req:Request,res:Response,next:NextFunction){
        if(req.body.userdata.role='admin'){
                next();
        }else{
            res.status(200).json({status:false,messsage:"You dont have permissions to perform this request"});
        }
    }

    driverGaurd(req:Request,res:Response,next:NextFunction){
        if(req.body.userdata.role='driver'){
                next();
        }else{
            res.status(200).json({status:false,messsage:"You dont have permissions to perform this request"});
        }
    }

    adminAndSuperAdminGaurd(req:Request,res:Response,next:NextFunction){
        if((req.body.userdata.role='admin')||(req.body.userdata.role='superadmin')){
                next();
        }else{
            res.status(200).json({status:false,messsage:"You dont have permissions to perform this request"});
        }
    }


}

const routeGuardObj = new routeGuard();
export default routeGuardObj;