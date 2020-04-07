import * as config from '../config/index';
import winstonobj from '../helpers/winstonLogger';
var MongoClient = require('mongodb').MongoClient;

class dbhelpers{
    url = `mongodb://${config.mongourl}:${config.mongoport}/`;

    constructor(){

    }
    createCollection(dbs:string,callback:any){
        MongoClient.connect(this.url, function(err:any, db:any) {
          if (err){
            callback({status:false,err:err})
          }else{
            var dbo = db.db(dbs);
            dbo.createCollection("logs",(err:any, res:any)=> {
              if (err){
                callback({status:false,err:err})
              }else{
                winstonobj.logWihWinston({status:true,msg:"Collection created!"},'SuccessLog');
                db.close();
                callback({status:true,err:err})
              }
            });
          }
        });
    }
}
const dbhelperobj = new dbhelpers();
export default dbhelperobj;