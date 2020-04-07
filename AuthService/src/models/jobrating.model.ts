import jobratingSchema from '../schemas/jobrating.schema';
import {model} from 'mongoose';

const jobrating = model('jobrating', jobratingSchema);
export default jobrating;