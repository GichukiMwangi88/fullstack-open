import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NonSensitivePatientData, NewPatientEntry } from '../types';

const getPatients = ():PatientEntry[] => {
    return patientData;
};

//get patient data without ssn
const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

// adding patients
const id: string = uuid();

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    // create a new patient object
    const newPatient = {
        id: id,
        ...entry,
    };

    patientData.push(newPatient);
    return newPatient;

};

export default {
    getPatients,
    getNonSensitivePatientData,
    addPatient
};
