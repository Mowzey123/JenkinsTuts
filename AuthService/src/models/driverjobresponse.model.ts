import driverjobresponseSchema from '../schemas/driverjobresponses.schema';
import {model} from 'mongoose';

const driverjobresponse = model('driverjobreponses', driverjobresponseSchema);
export default driverjobresponse;