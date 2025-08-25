import diagnosesData from '../../data/diagnoses';

import { DiagnosisEntry } from '../types';

const getDiagnoses = ():DiagnosisEntry[] => {
    return diagnosesData;
};

export default {
    getDiagnoses
};
