const kafka = require('kafka-node');
import utilObj from './helpers/util';
import producerObj from './producer';

const { ConsumerGroup } = kafka;

const options = {
  kafkaHost: '159.89.5.7:3002',
  groupId: 'FraudFailedQueueGroup',
};

class retrykafkaConsumer{
    consumerGroup = new ConsumerGroup(options, "FraudFailedQueue");
    constructor(){
        this.listenToQueue();
        this.queueSignals();
    }

    listenToQueue(){
        console.log('listening on retry que');
        this.consumerGroup.on('message', (record:any) => {
            utilObj.sleep(2000).then(()=>{
                producerObj.sendToQueue('racQueue',record.value,(err:any,data:any)=>{
                    if(err){
                        producerObj.sendToQueue('FraudFailedQueue',record.value,(err:any,data:any)=>{
                            if(err){ console.log(err);}
                        })
                    }   
                })
            });
        });
        this.consumerGroup.on('error', (err:any) => {
        console.error(`resendracQueue-consumer error ---------->`, err);
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

const retryconsumerObj= new retrykafkaConsumer();
export default retryconsumerObj;