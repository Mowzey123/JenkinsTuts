/**
 * Import all routes  here and export aggreagated functions under a single module
 *  
 */
import usermgtrouter from './usermgt.routes';

const Routes = {
    description:'Exporting all routes  under one module',
    userMgtService:usermgtrouter,
}

export default Routes;