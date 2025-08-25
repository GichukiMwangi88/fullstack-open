export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;

}

// Gender enum
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

// Use Omit type to ensure ssn isn't displayed on the frontend
export type NonSensitivePatientData = Omit<PatientEntry, 'ssn'>;

// Use Omit type to remove id when creating a new patient entry
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
