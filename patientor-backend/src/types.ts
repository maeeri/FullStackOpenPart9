export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    'Healthy' = 1,
    'LowRisk' = 2,
    'HighRisk' = 3,
    'CriticalRisk' = 4,
}

export enum EntryType {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    OccupationalHealthcare = 'Occupational Healthcare',
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge?: {
        date?: string;
        criteria?: string;
    };
}



export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    description: string;
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[];
}

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewEntry = UnionOmit<Entry, 'id'>;
export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other',
}
