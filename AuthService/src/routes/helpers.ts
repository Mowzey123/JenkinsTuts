const moment = require('moment');
import { Request,Response } from 'express';
import winstonobj from '../helpers/winstonLogger';
import cycledjobs from "../models/cycledjob.model"
import cancelledjobs from "../models/cancelledjobs.model";
import missedjobs from "../models/missedjobs.model";

class Services{

    
    constructor() {
        
    }

    async getCompletedJobs(req:Request,callback:any){
            let date = new Date();
            if(req.body.date){
                date = new Date(`${req.body.date}`);
            }
            await cycledjobs.aggregate([
                {
                    $project : { 
                        month : {$month : "$updatedAt"}, 
                        year : {$year :  "$updatedAt"},
                        day : {$dayOfMonth:"$updatedAt"},
                        week : {$week:"$updatedAt"},
                    }
                },
                {
                    $project: {
                        today:{
                            $cond:{
                                if: { 
                                        $and:[
                                            {$eq:["$month",date.getMonth()+1]},
                                            {$eq: ["$year",date.getFullYear()]},
                                            {$eq : ["$day",date.getDate()]}
                                        ]
                                    }, then: {$sum:1}, else: {$sum:0}
                                }
                        },
                        week:{
                            $cond:{
                                if: { 
                                        $and:[
                                            {$eq:["$month",date.getMonth()+1]},
                                            {$eq: ["$year",date.getFullYear()]},
                                            {$eq: ["$week",this.getNumberOfWeek(date)-1]}
                                        ]
                                    }, then: {$sum:1}, else: {$sum:0}
                                }
                        },
                        month: {
                            $cond:{
                                if: { 
                                        $and:[
                                            {$eq:["$month",date.getMonth()+1]},
                                            {$eq:["$year",date.getFullYear()]},
                                        ]
                                    }, then: {$sum:1}, else: {$sum:0}
                                }
                        },
                        year: {
                            $cond:{
                                if:  
                                    {$eq:["$year",date.getFullYear()]}      
                                , then: {$sum:1}, else: {$sum:0}
                            }
                        }
                    }
                },
                {
                    $group:{
                        _id:"completed jobs tiles",
                        yeartotal:{$sum:"$year"},
                        monthtotal:{$sum:"$month"},
                        weektotal:{$sum:"$week"},
                        todaytotal:{$sum:"$today"},
                    }
                }
            ],(err:any,result:any)=>{
                if(err){
                    console.log({status:false,msg:`error occured trying to find completed jobs aggregation`,err:err});
                    callback([{_id: 'completed jobs tiles',yeartotal: 0,monthtotal: 0,weektotal: 0,todaytotal: 0}]);
                }else{
                    if(result.length>0){
                        callback(result);
                    }else{
                        callback([{_id: 'completed jobs tiles',yeartotal: 0,monthtotal: 0,weektotal: 0,todaytotal: 0}]);
                    }
                }
            });
    }

    private  getNumberOfWeek = (date:any) => {
        return moment(date).week();
    }


    async getcancelledJobs  (req:Request,callback:any){
        let date = new Date();
        if(req.body.date){
            date = new Date(`${req.body.date}`);
        }
        await cancelledjobs.aggregate([
            {
                $project : { 
                    month : {$month : "$updatedAt"}, 
                    year : {$year :  "$updatedAt"},
                    day : {$dayOfMonth:"$updatedAt"},
                    week : {$week:"$updatedAt"},
                }
            },
            {
                $project: {
                    today:{
                        $cond:{
                            if: { 
                                    $and:[
                                        {$eq:["$month",date.getMonth()+1]},
                                        {$eq: ["$year",date.getFullYear()]},
                                        {$eq : ["$day",date.getDate()]}
                                    ]
                                }, then: {$sum:1}, else: {$sum:0}
                            }
                    },
                    week:{
                        $cond:{
                            if: { 
                                    $and:[
                                        {$eq:["$month",date.getMonth()+1]},
                                        {$eq: ["$year",date.getFullYear()]},
                                        {$eq: ["$week",this.getNumberOfWeek(date)-1]}
                                    ]
                                }, then: {$sum:1}, else: {$sum:0}
                            }
                    },
                    month: {
                        $cond:{
                            if: { 
                                    $and:[
                                        {$eq:["$month",date.getMonth()+1]},
                                        {$eq:["$year",date.getFullYear()]},
                                    ]
                                }, then: {$sum:1}, else: {$sum:0}
                            }
                    },
                    year: {
                        $cond:{
                            if:  
                                {$eq:["$year",date.getFullYear()]}      
                            , then: {$sum:1}, else: {$sum:0}
                        }
                    }
                }
            },
            {
                $group:{
                    _id:"cancelled jobs tiles",
                    yeartotal:{$sum:"$year"},
                    monthtotal:{$sum:"$month"},
                    weektotal:{$sum:"$week"},
                    todaytotal:{$sum:"$today"},
                }
            }
        ],(err:any,result:any)=>{
            if(err){
                console.log({status:false,msg:`error occured trying to find cancelled jobs aggregation`,err:err});
                callback([{_id: 'cancelled jobs tiles',yeartotal: 0,monthtotal: 0,weektotal: 0,todaytotal: 0}]);
            }else{
                if(result.length>0){
                    callback(result);
                }else{
                    callback([{_id: 'completed jobs tiles',yeartotal: 0,monthtotal: 0,weektotal: 0,todaytotal: 0}]);
                }
            }
        });
    }


    async getMissedJobs (req:Request,callback:any)  {
        let date = new Date();
        if(req.body.date){
            date = new Date(`${req.body.date}`);
        }
        await missedjobs.aggregate([
            {
                $project : { 
                    month : {$month : "$updatedAt"}, 
                    year : {$year :  "$updatedAt"},
                    day : {$dayOfMonth:"$updatedAt"},
                    week : {$week:"$updatedAt"},
                }
            },
            {
                $project: {
                    today:{
                        $cond:{
                            if: { 
                                    $and:[
                                        {$eq:["$month",date.getMonth()+1]},
                                        {$eq: ["$year",date.getFullYear()]},
                                        {$eq : ["$day",date.getDate()]}
                                    ]
                                }, then: {$sum:1}, else: {$sum:0}
                            }
                    },
                    week:{
                        $cond:{
                            if: { 
                                    $and:[
                                        {$eq:["$month",date.getMonth()+1]},
                                        {$eq: ["$year",date.getFullYear()]},
                                        {$eq: ["$week",this.getNumberOfWeek(date)-1]}
                                    ]
                                }, then: {$sum:1}, else: {$sum:0}
                            }
                    },
                    month: {
                        $cond:{
                            if: { 
                                    $and:[
                                        {$eq:["$month",date.getMonth()+1]},
                                        {$eq:["$year",date.getFullYear()]},
                                    ]
                                }, then: {$sum:1}, else: {$sum:0}
                            }
                    },
                    year: {
                        $cond:{
                            if:  
                                {$eq:["$year",date.getFullYear()]}      
                            , then: {$sum:1}, else: {$sum:0}
                        }
                    }
                }
            },
            {
                $group:{
                    _id:"missed jobs tiles",
                    yeartotal:{$sum:"$year"},
                    monthtotal:{$sum:"$month"},
                    weektotal:{$sum:"$week"},
                    todaytotal:{$sum:"$today"},
                }
            }
        ],(err:any,result:any)=>{
            if(err){
                console.log({status:false,msg:`error occured trying to find cancelled jobs aggregation`,err:err});
                callback([{_id: 'missed jobs tiles',yeartotal: 0,monthtotal: 0,weektotal: 0,todaytotal: 0}]);
            }else{
                if(result.length>0){
                    callback(result);
                }else{
                    callback([{_id: 'missed jobs tiles',yeartotal: 0,monthtotal: 0,weektotal: 0,todaytotal: 0}]);
                }
            }
        });
    }


}

const ServicesObj = new Services();
export default ServicesObj;