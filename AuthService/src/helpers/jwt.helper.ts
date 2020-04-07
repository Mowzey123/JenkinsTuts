
import {SECRETE} from '../config/';
const  jwt =  require("jsonwebtoken");

class jwtHelper{

    constructor(){
        
    }

    generateJwtToken(tokendata:Object){
        const secrete = Buffer.from(SECRETE||'secrete', 'base64');
        const token = jwt.sign(tokendata,secrete,{expiresIn:1800});
        return token;
    }

}

const jwtHelperObj = new jwtHelper();
export default jwtHelperObj;