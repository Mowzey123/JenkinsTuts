import mongoose = require('mongoose');
import * as config from './';
import winstonobj from '../helpers/winstonLogger';
require('mongoose-type-email');
 const MONGO_URI = `mongodb://${config.mongourl}:${config.mongoport}/${config.collection}?authSource=admin`;
 const options ={
    user:`${config.mngusername}`, 
    pass:`${config.mngpassword}`,
    keepAlive: true, 
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useCreateIndex: true
 }
 var connections:any = {};

 try {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(MONGO_URI, options);
    mongoose.connection.on('connected', ()=>{  
        winstonobj.logWihWinston({status:true,msg:'Mongoose default connection open to ' + MONGO_URI},'SuccessLogs');
    });
    
    // If the connection throws an error
    mongoose.connection.on('error', (err)=>{  
        winstonobj.logWihWinston({status:false,msg:'handle mongo errored connections: ' + err},'ErrorLogs');
    });
    
    // When the connection is disconnected
    mongoose.connection.on('disconnected', ()=>{  
        winstonobj.logWihWinston({status:false,msg:'Mongoose default connection disconnected'},'ErrorLogs'); 
    });
    
    process.on('SIGINT', ()=>{
        mongoose.connection.close(()=>{
            winstonobj.logWihWinston({status:false,msg:'App terminated, closing mongo connections'},'ErrorLogs');
            process.exit(0);
        });
    });
 } catch (error) {
     winstonobj.logWihWinston({status:false,msg:error},'ErrorLogs');
 }

 const getDatabaseConnection = (dbName:any)=>{
    if(connections[dbName]) {
        //database connection already exist. Return connection object
        return connections[dbName];
    } else {
        connections[dbName] = mongoose.createConnection(`mongodb://${config.mongourl}:${config.mongoport}/${dbName}?authSource=admin`, options);
        return connections[dbName];
    }       
}

export default getDatabaseConnection;
