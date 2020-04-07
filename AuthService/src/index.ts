import express =  require('express');
import bodyParser = require('body-parser');
import * as Config from './config';
import Logger from './helpers/logger';
import * as passport from 'passport';
require('./config/mongodb.connect');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
import Routes from './routes';
import winstonobj from './helpers/winstonLogger';
import { NextFunction ,Request,Response} from 'express';

class Server{

    app:express.Application;
    port: any;
  

    constructor(){
        this.app =  express();
        this.configureApp();
        this.configureRoutes();
    }


    configureApp():void{
         // this.app.use(cors);
         this.app.set('port', Config.PORT || 4000); 
         this.app.disable('x-powered-by');
         this.app.use(function(req, res, next) {  
             res.header("Access-Control-Allow-Origin", "*");
             res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
             res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
             res.header("Access-Control-Allow-Credentials", "true");
             next();
           });
         this.app.use(express.json({ limit: '10kb' })); // Body limit is 10
         this.app.use((err:any, req:Request, res:Response, next:NextFunction) => {
            winstonobj.logWihWinston({status:false,msg:`failed to parse json body`,err:err},'ErrorLogs'); 
            if(err.status === 400)
              return res.status(err.status).send('Invalid JSON body');
          
            return next(err); // if it's not a 400, let the default error handling do it. 
          });
         this.app.use(express.json());
         this.app.use(express.urlencoded({extended: false}));
         this.app.use(xss());
         this.app.use(mongoSanitize());
         this.app.use(passport.initialize());
         this.app.use(passport.session());
         new Logger(this.app);
    }

    configureRoutes():void{
        this.app.use('/authService',Routes.authManagement);
        this.app.use('/systemConstant',Routes.systemParamMg);
        this.app.use('/dashboardRoutes',Routes.dashboardroutes);
    }

    startServer():void{
        this.app.listen(this.app.get('port'),function(){
            winstonobj.logWihWinston({msg:`Server started on port `+Config.PORT},'SuccessLogs');
        });
    }
}

const serverObj = new Server();
serverObj.startServer();
export default serverObj.app;