import userordersSchema from '../schemas/userorders.schema';
import {model} from 'mongoose';

const userOderModel = model('usersoders', userordersSchema);
export default userOderModel;