import { Request,Response,NextFunction} from 'express';
let Joi = require('joi');
const joiobjecttid = require('joi-mongodb-objectid');
Joi =  Joi.extend(joiobjecttid);

class validatorClass{
    constructor(){

    }

    adminSignIn = (req:Request,res:Response,next:NextFunction)=>{
        const schema = Joi.object().keys({
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required().label('Password must atleast 5 and not greater than 30 characters'),
            email: Joi.string().email().required().label('Invalid email address'),
        });

        // Return result.
        const result = Joi.validate(req.body, schema);
        result.then((result:any)=>{
            next();
        }).catch((err:any)=>{
            this.populateErrors.bind(this)(err,res);
        });
    }

    setNewConstant = (req:Request,res:Response,next:NextFunction)=>{
        const schema = Joi.object().keys({
            constant: Joi.string().required().label('Constant name is required'),
            value: Joi.string().required().label('Constant value is required'),
        });

        // Return result.
        const result = Joi.validate({constant:req.body.constant,value:req.body.value}, schema);
        result.then((result:any)=>{
            next();
        }).catch((err:any)=>{
            this.populateErrors.bind(this)(err,res);
        });
    }

    editSystemConstants = (req:Request,res:Response,next:NextFunction)=>{
        const schema = Joi.object().keys({
            constantid: Joi.string().required().label('Constant id is required'),
            value: Joi.string().required().label('Constant value is required'),
        });

        // Return result.
        const result = Joi.validate({constantid:req.body.constantid,value:req.body.value}, schema);
        result.then((result:any)=>{
            next();
        }).catch((err:any)=>{
            this.populateErrors.bind(this)(err,res);
        });
    }

    editVehiclePricing = (req:Request,res:Response,next:NextFunction)=>{
        const schema = Joi.object().keys({
            pricingid: Joi.string().required().label('Constant id is required'),
            priceperkm: Joi.number().required().label('Price perkm is required'),
            waitingpriceperminute: Joi.number().required().label('waiting price per km is required'),
        });

        // Return result.
        const result = Joi.validate({pricingid:req.body.pricingid,priceperkm:req.body.priceperkm,waitingpriceperminute:req.body.waitingpriceperminute}, schema);
        result.then((result:any)=>{
            next();
        }).catch((err:any)=>{
            this.populateErrors.bind(this)(err,res);
        });
    }

    createAdminUser = (req:Request,res:Response,next:NextFunction)=>{
        const schema = Joi.object().keys({
            firstname: Joi.string().required().label('First Name is required'),
            lastname: Joi.string().required().label('Last Name is required'),
            email: Joi.email().required().label('User email is required'),
            role: Joi.role().required().label('User role is required'),
        });

        // Return result.
        const result = Joi.validate({firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,role:req.body.role}, schema);
        result.then((result:any)=>{
            next();
        }).catch((err:any)=>{
            this.populateErrors.bind(this)(err,res);
        });
    }

    populateErrors=(err:any,res:Response)=>{
        const errors=[];
            for(var i=0;i<err.details.length;i++){
                // console.log(err.details[i].context);
                errors.push({field:err.details[i].context.key,val:err.details[i].context.label});
            }
            res.status(202).json({status:false,msg:'Service request failed',Errlevel:"validation",error:errors});
    }
}

const validator = new validatorClass();
export default validator;
