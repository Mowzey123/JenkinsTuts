import fs = require('fs');
import path = require('path');
import morgan = require('morgan');
import morganBody = require('morgan-body');
import { createLogger, format, transports } from 'winston';
import {LOG_LEVEL} from '../config';

export default class Logger{
    logger: any;

    constructor(app:any){
        this.createMorganLogger(app);
    }

    createMorganLogger(app:any){
       const dril= process.env.LOG_DIR?process.env.LOG_DIR:'';
       const basedir=path.join(__dirname,"../../../../logs/authservice",dril);

        app.use(morgan('combined', {
           skip: function (req, res) {
               return res.statusCode < 400
           },stream: fs.createWriteStream(path.join(basedir,'access.log'), { flags: 'a' })
       }));

       app.use(morgan('combined', {
           skip: function (req, res) {
               return res.statusCode >= 400
           },stream: fs.createWriteStream(path.join(basedir,'error.log'), { flags: 'a' })
       }));

       morganBody(app, {
       skip:function(req:Request,res:Response){

       },
      stream: fs.createWriteStream(path.join(basedir,'reqres.log'), { flags: 'a' })
       });
    }

    logWihWinston(tolog:any,dir:string){
       const basedir=path.join(__dirname,"../../../../../logs/authservice",dir,'access.log');

        const logger=createLogger({
            level: LOG_LEVEL === 'development' ? 'debug' : 'info',
            format: format.combine(
                format.timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
                format.json()
              ),
            transports: [
            new transports.Console(),
           new transports.File({ filename: basedir })
          ]});
        logger.info(tolog);
    }

}
