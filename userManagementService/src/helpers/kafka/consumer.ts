const kafka = require('kafka-node');
const { ConsumerGroup } = kafka;

export default class kafkaConsumer{
    consumerGroup: any;
    constructor(topic:string,option:{kafkaHost:string,groupId:string}){
        let options:any =option
        options.fromOffset='latest';
        options.commitOffsetsOnFirstJoin=true;
        options.autoCommit=true;
        options.autoCommitIntervalMs=5000;
        options.fetchMaxBytes=1024*1024;
        options.metaDataMaxAgeMs=5000

        this.consumerGroup = new ConsumerGroup(options, topic);
        this.queueSignals();
    }

    listenToQueue(callback:any){
        console.log('listening on '+this.consumerGroup.options.groupId);
        this.consumerGroup.on('message', (record:any) => {
            const message = record.value.toString('utf-8');
            callback(null,message);
          });
          
        this.consumerGroup.on('error', (err:any) => {
        console.error(`mlQueue-consumer error ---------->`, err);
        callback(err,null);
        });
    }

    queueSignals(){
        process.on('SIGINT', ()=>{
            console.log('Shutdown started --------->');
            this.consumerGroup.close((err:any) => {
            console.log('Kafka connection closed --------->');
            process.exit(err ? 1 : 0);
            });
        });
          
        process.on('SIGTERM', ()=>{
            console.log('Shutdown started --------->');
            this.consumerGroup.close((err:any) => {
            console.log('Kafka connection closed --------->');
            process.exit(err ? 1 : 0);
        });
        });
    }

}

