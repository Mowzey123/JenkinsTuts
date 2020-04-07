import driverSchema from '../schemas/driver.schema';
import {model} from 'mongoose';

const appDrivers = model('drivers', driverSchema);
export default appDrivers;