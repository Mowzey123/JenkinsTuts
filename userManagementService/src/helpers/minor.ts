import * as bcrypt from 'bcryptjs';
// const uuidv4 = require('uuid/v4');
const uuidv4 = require('uuidv4');
const sha256 = require("sha256");
const fs = require('fs');
const path = require('path');

class minor{
    constructor(){
        
    }

    hashPassword(password: string):String{
        let hash = '';
        if(password.length<10){
            hash  = bcrypt.hashSync(password);
        }else{
            hash  = sha256(password);
        }
        
        return hash;
    }

    comparePassword(password: string,hash: string):Boolean{
        if(password.length<10){
            return bcrypt.compareSync(password,hash);
        }else{
            if(sha256(password)===hash){
                return true;
            }else{
                return false;
            }
        }
        
    }

    generateUUIDstring():string{
        console.log(uuidv4());
        return uuidv4();
    }


    //delete dir content
    // deleteDirContent(directory:string){
    //     switch(directory){
    //         case 'datastore':
    //             directory=path.join(__dirname,"../../datastore");
    //         break;

    //         default:
    //             directory='';
    //         break;
    //     }
    //     if(directory != ""){
    //     fs.readdir(directory, (err:any, files:any) => {
    //         if (err) {console.log(err)};
          
    //         for (const file of files) {
    //           fs.unlink(path.join(directory, file), (err:any) => {
    //             if (err) console.log(err);
    //           });
    //         }
    //       });
    //     }
    // }

}

const minorObj = new minor();
export default minorObj;