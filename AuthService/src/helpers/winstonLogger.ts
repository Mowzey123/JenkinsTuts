import path = require('path');
import { createLogger, format, transports } from 'winston';
import {LOG_LEVEL} from '../config/index';

class winstonLogger{
    logger: any;

    constructor(){
    }

    logWihWinston(tolog:any,dir:string){
      //  const basedir=path.join(__dirname,"../../../../../../var/log/logs/usermanagementservice/",dir,'custom.log');
       const basedir=path.join(__dirname,"../../../../logs/authservice",dir,'custom.log');

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
const winstonobj = new winstonLogger();
export  default winstonobj;