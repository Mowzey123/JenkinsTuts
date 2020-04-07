import {frontendhost,compamyname} from '../config';

export function registrationEmail(details:{firstname:string,email:string,token:string}){
    const message =`
    <p>Hi ${details.firstname},</p>
    <p>Thank you for registering with ${compamyname}.</p>
    <p>Please click the <a href='https://${frontendhost}/ConfirmingEmail/${details.token}/admin'> link </a>to verify your email address.</p>
    <p style='color:#aaa;font-weight:bolder;'>Regards</p>
    `;
    return message; 
};

export  function adminrights(details:{temporarypassword:string,role:string,email:string,token:string,firstname:string}){
    const message =`
    <p>Hello ${details.firstname},</p>
    <p>You have been given administrative rights to access  ${compamyname} administation as a ${details.role}.</p>
    <p>Login Details</p>
    <p>Email: ${details.email}</p>
    <p>Temporary Password: ${details.temporarypassword}</p>
    <p>Please click the <a href='https://${frontendhost}/ConfirmingNewAdmin/${details.token}'> link </a>to verify your email address.</p>
    <p style='color:#aaa;font-weight:bolder;'>Regards</p>
    `;
    return message; 
};

export function  passwordresset(details:{temporarypassword:string,email:string,token:string,firstname:string}) {
    const message =`
    <p>Hello ${details.firstname},</p>
    <p>Your password has been succesfully resset,please click link below to set a new password</p>
    <p>Resset Password</p>
    <p>${details.temporarypassword}</p>
    <p>Please click the <a href='https://${frontendhost}/ressetAdminPassword/${details.token}'> link </a>to set new password.</p>
    <p style='color:#aaa;font-weight:bolder;'>Regards</p>
    `;
    return message; 
}