const kafka = require('kafka-node');
const { Offset } = kafka;
class util{

    constructor(){

    }

    offsetOutOfRangeCb(client:any, consumer:any,topic:any){
        const offset = new Offset(client);
        const topicUpdated = topic;
        topicUpdated.maxNum = 2;
        offset.fetch([topicUpdated], (err, offsets) => {
          if (err) {
            return console.error(err);
          }
          const min = Math.min(offsets[topicUpdated.topic][topicUpdated.partition]);
          return consumer.setOffset(topicUpdated.topic, topicUpdated.partition, min);
        });
    }

    sleep(time:number){
        return new Promise(resolve => setTimeout(resolve, time));
    }    
}

const utilObj = new util();
export default utilObj;