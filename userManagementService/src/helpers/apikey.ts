import minorObj from '../helpers/minor';

class ApiKeys{
    apikeyslist:any;

    constructor(){
       this.apikeyslist = new Map();
    }

    setAPIKey(client:any):string{
        const key = minorObj.generateUUIDstring();
        this.apikeyslist.set(key, {
          clientid: client.hashedtoken,
          email: client.email,
        });
        return key;
    }

    getSecret(keyId:string, done:any) {
        if (!this.apikeyslist.has(keyId)) {
          done(new Error('Unknown api key'));
        }
        const clientApp = this.apikeyslist.get(keyId);
        done(null, clientApp.secret, {
          id: clientApp.id,
          name: clientApp.name
        });
    }
    
}

const apikeysobj = new ApiKeys();
export default apikeysobj;