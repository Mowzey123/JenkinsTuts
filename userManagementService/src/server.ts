import app from "./index";
import winstonobj from "./helpers/winstonLogger";

app.listen(app.get('port'),()=>{
    winstonobj.logWihWinston(`Server started on port ${app.get('port')}`,'SuccesLogs');
})