import { Request, Response,Router} from 'express';
import minorObj from '../helpers/minor';
import winstonobj from '../helpers/winstonLogger';
import validator from '../helpers/validators.helpers';
import auth from '../helpers/auth';
import routeGuardObj from "../helpers/routeguard"
import systemconstants from "../models/systemconstants.model";
import vehiclepricing from "../models/vehiclepricing.model"
class systemParamMgt{
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
        this.setInitialParams();
        this.setInitialVehiclePrices()
    }

    setInitialParams(){
        const constants = [{constant:"maxorderdistance",value:2000,units:"km"}];
        constants.forEach((element:any,index:any)=>{
            systemconstants.find({constant:element.constant},(err:any,constant:any)=>{
                if(err){
                    winstonobj.logWihWinston({status:false,message:"Failed to find constant",err:err},'ErrorLogs');
                }else{
                    if(constant.length>0){
                        winstonobj.logWihWinston({status:true,message:"Constant name already exists"},'SuccessLogs');
                    }else{
                        const newconst = new systemconstants({constant:element.constant,value:element.value,units:element.units});
                        newconst.save((err:any,saved:any)=>{
                            if(err){
                                winstonobj.logWihWinston({status:false,message:"Failed to save constant",err:err},'ErrorLogs');
                            }else{
                                winstonobj.logWihWinston({status:true,message:"Constant saved"},'SuccessLogs');
                            }
                        });
                    }   
                }
            }); 
        });
    }

    setInitialVehiclePrices(){
        const constants = [
            {type:"economy",priceperkm:2000,waitingpriceperminute:100,basefare:5000},
            {type:"minivan",priceperkm:4000,waitingpriceperminute:200,basefare:5000},
            {type:"pro",priceperkm:6000,waitingpriceperminute:300,basefare:5000}
        ];
        constants.forEach((element:any,index:any)=>{
            vehiclepricing.find({type:element.type},(err:any,constant:any)=>{
                if(err){
                    winstonobj.logWihWinston({status:false,message:"Failed to find vehicle pricing",err:err},'ErrorLogs');
                }else{
                    if(constant.length>0){
                        winstonobj.logWihWinston({status:true,message:"Vehicle pricing already exists"},'SuccessLogs');
                    }else{
                        const newconst = new vehiclepricing({type:element.type,priceperkm:element.priceperkm,waitingpriceperminute:element.waitingpriceperminute,basefare:element.basefare});
                        newconst.save((err:any,saved:any)=>{
                            if(err){
                                winstonobj.logWihWinston({status:false,message:"Failed to save vehicle pricing",err:err},'ErrorLogs');
                            }else{
                                winstonobj.logWihWinston({status:true,message:"Vehicle pricing saved"},'SuccessLogs');
                            }
                        });
                    }   
                }
            }); 
        });
    }


    setNewConstant(req:Request,res:Response){
        systemconstants.find({constant:req.body.name},(err:any,constant:any)=>{
            if(err){
                res.status(500).json({status:false,message:"Failed to find constant",err:err});
            }else{
                if(constant.length>0){
                    res.status(200).json({status:true,message:"Constant name already exists"});
                }else{
                    const newconst = new systemconstants({constant:req.body.constant,value:req.body.value});
                    newconst.save((err:any,saved:any)=>{
                        if(err){
                            res.status(500).json({status:false,message:"Failed to save constant",err:err});
                        }else{
                            res.status(200).json({status:true,message:"Constant saved"});
                        }
                    });
                }   
            }
        }); 
    }

    getAllSystemConstants(req:Request,res:Response){
        systemconstants.find({},(err:any,constant:any)=>{
            if(err){
                res.status(500).json({status:false,message:"Failed to fetch constants",err:err});
            }else{
                res.status(200).json({status:true,message:"fetched constants",data:constant});
            }
        });
    }

    editSystemConstants(req:Request,res:Response){
        systemconstants.findOneAndUpdate({_id:req.body.constantid},{value:req.body.value},(err:any,constant:any)=>{
            if(err){
                res.status(500).json({status:false,message:"Failed to fetch constants",err:err});
            }else{
                if(constant){
                    res.status(200).json({status:true,message:"Edited constant",data:constant});
                }else{
                    res.status(200).json({status:true,message:"Failed to edit constant",data:constant});
                }
            }
        });
    }

    getAllVehiclePricing(req:Request,res:Response){
        vehiclepricing.find({},(err:any,constant:any)=>{
            if(err){
                res.status(500).json({status:false,message:"Failed to fetch vehicle pricing",err:err});
            }else{
                res.status(200).json({status:true,message:"fetched prices",data:constant});
            }
        });
    }

    editVehiclePricing(req:Request,res:Response){
        vehiclepricing.findOneAndUpdate({_id:req.body.pricingid},{priceperkm:req.body.priceperkm,waitingpriceperminute:req.body.waitingpriceperminute},(err:any,update:any)=>{
            if(err){
                res.status(500).json({status:false,message:"Failed to update Pricing",err:err});
            }else{
                if(update){
                    res.status(200).json({status:true,message:"Vehicle Pricing  updated "});
                }else{
                    res.status(200).json({status:false,message:"Failed to update vehicle pricing"});
                }
            }
        });
    }

    routes(): void {
        // this.router.post('/setNewConstant',auth.checkAuth,routeGuardObj.superAdminGaurd,validator.setNewConstant,this.setNewConstant);
        // this.router.post('/getAllSystemConstants',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.getAllSystemConstants);
        // this.router.post('/editSystemConstants',auth.checkAuth,routeGuardObj.superAdminGaurd,validator.editSystemConstants,this.editSystemConstants);
        this.router.post('/getAllVehiclePricing',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.getAllVehiclePricing);
        this.router.post('/editVehiclePricing',auth.checkAuth,routeGuardObj.superAdminGaurd,validator.editVehiclePricing,this.editVehiclePricing);
    }

}
// access
const systemParamMgtObj = new systemParamMgt();
systemParamMgtObj.routes();
export default systemParamMgtObj.router;