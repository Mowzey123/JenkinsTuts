import vehiclepricingscema from '../schemas/vehiclepricing.schema';
import {model} from 'mongoose';

const vehiclepricing = model('vehiclepricing', vehiclepricingscema);
export default vehiclepricing;