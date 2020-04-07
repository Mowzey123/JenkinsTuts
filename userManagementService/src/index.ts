import express =  require('express');
import bodyParser = require('body-parser');
import * as Config from './config/index';
import Logger from './helpers/logger';
import * as passport from 'passport';
require('./config/mongodb.connect');
import Routes from './routes';
const fileUpload = require('express-fileupload');
import winstonobj from './helpers/winstonLogger';
import { NextFunction,Request,Response } from 'express';

class Server{

    public app:any;
    public port: any;
  

    constructor(){
        this.app =  express();
        this.port = Config.PORT
        this.configureApp();
        this.configureRoutes();
    }


    configureApp():void{
         // this.app.use(cors);
         this.app.set('port',this.port ); 
         this.app.disable('x-powered-by');
         this.app.use(function(req:any, res:any, next:any) {  
             res.header("Access-Control-Allow-Origin", "*");
             res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
             res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
             res.header("Access-Control-Allow-Credentials", "true");
             next();
           });
         this.app.use(bodyParser.json());
         this.app.use(express.json());
         this.app.use((err:any, req:Request, res:Response, next:NextFunction) => {
            winstonobj.logWihWinston({status:false,msg:`failed to parse json body`,err:err},'ErrorLogs'); 
            if(err.status === 400)
              return res.status(err.status).send('Invalid JSON body sent');
          
            return next(err); // if it's not a 400, let the default error handling do it. 
          });
         this.app.use(express.urlencoded({extended: false}));
         this.app.use(passport.initialize());
         this.app.use(passport.session());
         this.app.use(fileUpload({
            limits: { fileSize: 1000000 },
          }));
         new Logger(this.app);
    }

    configureRoutes():void{
        this.app.use('/usermgtservice',Routes.userMgtService);
    }

}

export default new Server().app;
