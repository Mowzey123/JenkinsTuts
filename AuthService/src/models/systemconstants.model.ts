import systemconstSchema from '../schemas/systemconstants.schema';
import {model} from 'mongoose';

const systemconstants = model('systemconstants', systemconstSchema);
export default systemconstants;