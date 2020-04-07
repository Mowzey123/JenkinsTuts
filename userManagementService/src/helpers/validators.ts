import { Request,Response,NextFunction} from 'express';
let Joi = require('joi');
const joiobjecttid = require('joi-mongodb-objectid');
Joi =  Joi.extend(joiobjecttid);

class validatorClass{
    constructor(){

    }

    signupValidation = (req:Request,res:Response,next:NextFunction)=>{
        const schema = Joi.object().keys({
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required().label('Password must atleast 5 and not greater than 30 characters'),
            email: Joi.string().email().trim().required().label('Invalid email address'),
            firstname:Joi.string().trim().required().label('First Name is required '),
            lastname:Joi.string().trim().required().label('Last Name is required '),
            phonenumber:Joi.string().trim().required().label('Phone number is required '),
            companyname: Joi.string().trim().required().label('Company name is required '),
            noofemployees: Joi.string().trim().required().label('Number of employees is required'),
        });

        // Return result.
        const result = Joi.validate(req.body, schema);
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
            res.status(202).json({status:false,msg:'Service request failed',Errlevel:"lvlone",error:errors});
    }

    addAdminProfile = (req:Request,res:Response,next:NextFunction)=>{
        const schema = Joi.object().keys({
            token: Joi.string().trim().required().label('Token is required '),
            firstname:Joi.string().trim().required().label('First Name is required '),
            lastname:Joi.string().trim().required().label('Last Name is required '),
            phonenumber:Joi.string().trim().required().label('Phone number is required '),
        });

        // Return result.
        const result = Joi.validate(req.body, schema);
        result.then((result: any)=>{
            next();
        }).catch((err: any)=>{
            this.populateErrors(err,res);
        });
    }


    signupClientCompanyDetails = (req:Request,res:Response,next:NextFunction) => {
        const schema = Joi.object().keys({
            token: Joi.string().trim().required().label('Company token is required '),
            companyname: Joi.string().trim().required().label('Company name is required '),
            noofemployees: Joi.string().trim().required().label('Number of employees is required')
        });

        // Return result.
        const result = Joi.validate(req.body, schema);
        result.then((result: any)=>{
            next();
        }).catch((err: any)=>{
            this.populateErrors(err,res);
        });
    }

    addUserProfile = (req:Request,res:Response,next:NextFunction) =>{
        const schema = Joi.object().keys({
            firstname:Joi.string().trim().required().label('First Name is required '),
            lastname:Joi.string().trim().required().label('Last Name is required '),
            phone:Joi.string().trim().required().label('Phone number is required '),
            email: Joi.string().trim().required().label('Email is required '),
            role:Joi.string().trim().valid('admin', 'developer','rac manager'),
        });

        // Return result.
        const result = Joi.validate({firstname:req.body.firstname,lastname:req.body.lastname,phone:req.body.phone,email:req.body.email,role:req.body.role}, schema);
        result.then((result: any)=>{
            next();
        }).catch((err: any)=>{
            this.populateErrors(err,res);
        });
    }

    editUserProfile = (req:Request,res:Response,next:NextFunction) => {
        const schema = Joi.object().keys({
            firstname:Joi.string().trim().required().label('First Name is required '),
            lastname:Joi.string().trim().required().label('Last Name is required '),
            phone:Joi.string().trim().required().label('Phone number is required '),
            // email: Joi.string().required().label('Email is required '),
            role:Joi.string().trim().valid('admin', 'superadmin'),
        });

        // Return result.
        const result = Joi.validate({firstname:req.body.firstname,lastname:req.body.lastname,phone:req.body.phone,role:req.body.role}, schema);
        result.then((result: any)=>{
            next();
        }).catch((err: any)=>{
            this.populateErrors(err,res);
        });
    }


    disableTeamUser = (req:Request,res:Response,next:NextFunction) => {
        //addd max and min length
        const schema = Joi.object().keys({
            memberid: Joi.string().trim().required().label('User identifier is required'),
        });

        // Return result.
        const result = Joi.validate({memberid:req.body.memberid}, schema);
        result.then((result: any)=>{
            next();
        }).catch((err: any)=>{
            this.populateErrors(err,res);
        });
    }

    adminEditUserprofile = (req:Request,res:Response,next:NextFunction) => {
        //addd max and min length
        const schema = Joi.object().keys({
            firstname: Joi.string().trim().required().label('First name is requried'),
            lastname:Joi.string().trim().required().label('Lastname is required'),
            role:Joi.string().trim().required().label('Role is required'),
            phone:Joi.string().trim().required().label('phone is required'),
            userid:Joi.string().trim().required().label("User id is required"),
        });

        // Return result.
        const result = Joi.validate({firstname:req.body.firstname,lastname:req.body.lastname,role:req.body.role,phone:req.body.phone,userid:req.body.userid}, schema);
        result.then((result: any)=>{
            next();
        }).catch((err: any)=>{
            this.populateErrors(err,res);
        });
    }

    changeUserPassword = (req:Request,res:Response,next:NextFunction) => {
        //addd max and min length
        const schema = Joi.object().keys({
            newpassword: Joi.string().trim().required().label('New password is requried'),
            oldpassword:Joi.string().trim().required().label('Old password is required'),
        });

        // Return result.
        const result = Joi.validate({newpassword:req.body.newpassword,oldpassword:req.body.oldpassword}, schema);
        result.then((result: any)=>{
            next();
        }).catch((err: any)=>{
            this.populateErrors(err,res);
        });
    }
}

const validator = new validatorClass();
export default validator;
