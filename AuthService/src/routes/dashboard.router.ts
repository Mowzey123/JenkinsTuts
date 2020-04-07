import { Request, Response,Router} from 'express';
import winstonobj from '../helpers/winstonLogger';
import auth from '../helpers/auth';
import routeGuardObj from "../helpers/routeguard"
import cycledjobs from "../models/cycledjob.model";
import adminUsers from '../models/admin.model';
import appUsers from '../models/user.model';
import appDrivers from "../models/driver.model";
import ServicesObj from "./helpers";
import jobrating from "../models/jobrating.model";

class dashBoardRouter{
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    vehiclePerformance = (req:Request,res:Response) => {
        cycledjobs.aggregate([
                {
                    $group: {
                        _id: "$cartype",
                        count: {$sum: 1},
                    }
                }
            ]
            ,(err:any,results:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,message:"failed to get vehicle performance",err:err},'ErrorLogs')
                res.status(500).json({status:false,message:"Something went wrong"})
            }else{
                if(results.length>0){
                    res.status(200).json({status:true,message:'fetched vehicle performance',results})
                }else{
                    res.status(200).json({status:true,message:'No results found',results:[]})
                }
            }
        })
    }

    monthlyPerformance = (req:Request,res:Response) => {
        cycledjobs.aggregate([
                {
                    $project:{
                        month:{$month:"$createdAt"}
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        count: {$sum: 1},
                    }
                }
            ]
            ,(err:any,results:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,message:"failed to get vehicle per month",err:err},'ErrorLogs')
                res.status(500).json({status:false,message:"Something went wrong"})
            }else{
                if(results.length>0){
                    res.status(200).json({status:true,message:'fetched vehicle per month',results})
                }else{
                    res.status(200).json({status:true,message:'No results found',results:[]})
                }
            }
        })
    }

    HourlyPerformance = (req:Request,res:Response) => {
        cycledjobs.aggregate(
            [
                {
                    $addFields:{
                        "hour":{$hour:"$createdAt"}
                    }
                }
                ,{
                    $group:{
                        _id:"$hour",
                        totaltrips:{$sum:1},
                    }
                },
            ]
            ,(err:any,results:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,message:"failed to get HourlyPerformance",err:err},'ErrorLogs')
                res.status(500).json({status:false,message:"Something went wrong"})
            }else{
                if(results.length>0){
                    res.status(200).json({status:true,message:'fetched vehicle HourlyPerformance',results})
                }else{
                    res.status(200).json({status:true,message:'No results found',results:[]})
                }
            }
        })
    }

    groupedMonthlyPerformnance = (req:Request,res:Response) => {
        cycledjobs.aggregate([
            {
                $addFields:{
                    "month":{$month:"$createdAt"}
                }
            }
            ,{
                $group:{
                    _id:"$month",
                    totaltrips:{$sum:1},
                    cartype:{$push:"$cartype"}
                }
            },
            {
                $project: {
                    _id: 1,
                    totaltransactions:1,
                    count: 1,
                    minivan: {
                                $size: {
                                    $filter: {
                                        input: "$cartype",
                                        as: "item",
                                        cond: {
                                            $eq: ["$$item", "minivan"]
                                        }
                                    }
                                }
                    },
                    economy: {
                        $size: {
                            $filter: {
                                input: "$cartype",
                                as: "item",
                                cond: {
                                    $eq: ["$$item", "economy"]
                                }
                            }
                        }
                    },
                    pro: {
                        $size: {
                            $filter: {
                                input: "$cartype",
                                as: "item",
                                cond: {
                                    $eq: ["$$item", "pro"]
                                }
                            }
                        }
                    }
                }
            }
        ]
            ,(err:any,results:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,message:"failed to get groupedMonthlyPerformnance",err:err},'ErrorLogs')
                res.status(500).json({status:false,message:"Something went wrong"})
            }else{
                if(results.length>0){
                    res.status(200).json({status:true,message:'fetched groupedMonthlyPerformnance',results})
                }else{
                    res.status(200).json({status:true,message:'No results found',results:[]})
                }
            }
        })
    }


    groupedHourlyPerformnance = (req:Request,res:Response) => {
        cycledjobs.aggregate([
                {
                    $project: {
                        createdAt:1,
                        minivan: {
                            $cond: {
                                if:{$eq:["$cartype","minivan"]},
                                then:{$sum:1},
                                else:{$sum:0}
                            }
                        },
                        pro:{
                            $cond: {
                                if:{$eq:["$cartype","pro"]},
                                then:{$sum:1},
                                else:{$sum:0}
                            }
                        },
                        economy:{
                            $cond: {
                                if:{$eq:["$cartype","economy"]},
                                then:{$sum:1},
                                else:{$sum:0}
                            }
                        }
                    }
                },
                {
                    $group:{
                        _id:{$hour:"$createdAt"},
                        minivan:{$sum:"$minivan"},
                        economy:{$sum:"$economy"},
                        pro:{$sum:"$pro"},
                    }
                }
            ]
            ,(err:any,results:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,message:"failed to get groupedHourlyPerformnance",err:err},'ErrorLogs')
                res.status(500).json({status:false,message:"Something went wrong"})
            }else{
                if(results.length>0){
                    res.status(200).json({status:true,message:'fetched groupedHourlyPerformnance',results})
                }else{
                    res.status(200).json({status:true,message:'No results found',results:[]})
                }
            }
        })
    }

    systemUsers = (req:Request,res:Response) => {
        const data = {appusers:0,admins:0,drivers:0};
        appUsers.find({},(err:any,users:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,message:"failed to get find total system users",err:err},'ErrorLogs')
                res.status(500).json({status:false,message:"Something went wrong"})
            }else{
                    data.appusers = users.length
                    adminUsers.find({},(err:any,admins:any)=>{
                        if(err){
                            winstonobj.logWihWinston({status:false,message:"failed to get find total system users",err:err},'ErrorLogs')
                            res.status(500).json({status:false,message:"Something went wrong"})
                        }else{
                            data.admins=admins.length
                            appDrivers.find({},(err:any,drivers:any)=>{
                                if(err){
                                    winstonobj.logWihWinston({status:false,message:"failed to get find total system users",err:err},'ErrorLogs')
                                    res.status(500).json({status:false,message:"Something went wrong"})
                                }else{
                                    data.drivers = drivers.length
                                    res.status(200).json({status:true,message:'system users',data:data})
                                }
                            });
                        }
                })
            }
        })
    }

    completedTripsSummary = (req:Request,res:Response) => {
        ServicesObj.getCompletedJobs(req,(results:any)=>{
            res.status(200).json({status:true,message:'Fetched summary complete jobs',results:results})
        });
    }


    cancelledTripsSummary = (req:Request,res:Response) => {
        ServicesObj.getcancelledJobs(req,(results:any)=>{
            res.status(200).json({status:true,message:'Fetched cancelled jobs tiles',results:results})
        });
    }

    missedTripsSummary = (req:Request,res:Response) => {
        ServicesObj.getMissedJobs(req,(results:any)=>{
            res.status(200).json({status:true,message:'Fetched missed jobs tiles',results:results})
        });
    }

    weeklyPerformance = (req:Request,res:Response) => {
        cycledjobs.aggregate([
            {
                $project: {
                    createdAt:1,
                    minivan: {
                        $cond: {
                            if:{$eq:["$cartype","minivan"]},
                            then:{$sum:1},
                            else:{$sum:0}
                        }
                    },
                    pro:{
                        $cond: {
                            if:{$eq:["$cartype","pro"]},
                            then:{$sum:1},
                            else:{$sum:0}
                        }
                    },
                    economy:{
                        $cond: {
                            if:{$eq:["$cartype","economy"]},
                            then:{$sum:1},
                            else:{$sum:0}
                        }
                    }
                }
            },
            {
                $group:{
                    _id:{$dayOfWeek:"$createdAt"},
                    minivan:{$sum:"$minivan"},
                    economy:{$sum:"$economy"},
                    pro:{$sum:"$pro"},
                }
            }
        ]
        ,(err:any,results:any)=>{
        if(err){
            winstonobj.logWihWinston({status:false,message:"failed to get groupedWeekyPerformnance",err:err},'ErrorLogs')
            res.status(500).json({status:false,message:"Something went wrong"})
        }else{
            if(results.length>0){
                res.status(200).json({status:true,message:'fetched groupedWeekyPerformnance',results})
            }else{
                res.status(200).json({status:true,message:'No results found',results:[]})
            }
        }
    })
    }

    ratingStats = (req:Request,res:Response) => {
        jobrating.aggregate([
            {
                $group:{
                    _id:"$rating",
                    count:{$sum:1}
                }
            }
        ],(err:any,results:any)=>{
            if(err){
                winstonobj.logWihWinston({status:false,message:"failed to get groupedWeekyPerformnance",err:err},'ErrorLogs')
                res.status(500).json({status:false,message:"Something went wrong"})
            }else{
                if(results.length>0){
                    res.status(200).json({status:true,message:'fetched rating',results})
                }else{
                    res.status(200).json({status:true,message:'No results found',results:[{totalrating:0,totalcount:0,fivestar:0,fourstar:0,threestar:0,twostar:0,onestar:0}]})
                }
            }
        })
    }

    routes(): void {
        this.router.post('/vehiclePerformance',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.vehiclePerformance);
        this.router.post('/monthlyPerformance',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.monthlyPerformance);
        this.router.post('/weeklyPerformance',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.weeklyPerformance);
        this.router.post('/HourlyPerformance',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.HourlyPerformance);
        this.router.post('/systemUsers',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.systemUsers);
        this.router.post('/groupedMonthlyPerformnance',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.groupedMonthlyPerformnance);
        this.router.post('/groupedHourlyPerformnance',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.groupedHourlyPerformnance);
        this.router.post('/getSummaryCompletedTrips',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.completedTripsSummary);
        this.router.post('/getcancelledTripsSummary',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.cancelledTripsSummary);
        this.router.post('/missedTripsSummary',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.missedTripsSummary);
        this.router.post('/ratingStats',auth.checkAuth,routeGuardObj.adminAndSuperAdminGaurd,this.ratingStats);
    }

}
// access
const dashBoardRouterObj = new dashBoardRouter();
dashBoardRouterObj.routes();
const dashboardrouter = dashBoardRouterObj.router;
export default dashboardrouter;
