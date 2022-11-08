export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;
export type ReturnPatient = Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>;

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}
