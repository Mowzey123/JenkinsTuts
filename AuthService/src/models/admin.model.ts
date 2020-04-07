import adminSchema from '../schemas/admin.schema';
import {model} from 'mongoose';

const adminUsers = model('adminusers', adminSchema);
export default adminUsers;