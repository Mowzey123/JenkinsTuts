import userSchema from '../schemas/user.schema';
import {model} from 'mongoose';

const appUsers = model('appusers', userSchema);
export default appUsers;