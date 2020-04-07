
/**
 * Import all routes  here and export aggreagated functions under a single module
 *  
 */
import authRouterObj from './auth.router';
import systemParamMgtObj from './systemparams.router';
import dashboardrouter from "./dashboard.router"
const Routes = {
    description:'Exporting all routes  under one module',
    authManagement:authRouterObj,
    systemParamMg:systemParamMgtObj,
    dashboardroutes:dashboardrouter
}

export default Routes;