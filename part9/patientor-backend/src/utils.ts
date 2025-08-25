import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if(!isString(name)) {
        throw new Error('Incorrect name');
    }

    return name;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if(!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect date of birth: ' + dateOfBirth);
    };

    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if(!isString(ssn)) {
        throw new Error('Incorrect ssn: ' + ssn);
    };

    return ssn;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    };

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!isString(occupation)) {
        throw new Error('Incorrect occupation: ' + occupation);
    };

    return occupation;
};


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    console.log('New Patient Entry: ', object);

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object 
        && 'gender' in object && 'occupation' in object
    ) {
        const newPatient: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };

        return newPatient;
    }

    throw new Error('Incorrect data: Some fields are missing');
      
};

export default toNewPatientEntry;
