import { NewPatient, Gender, NewEntry, HealthCheckRating, EntryType, NewBaseEntry, Diagnosis } from './types';
import { getDiagnoses } from './services/diagnosisService';

export const parseDiagnoses = (param?: unknown[]): Array<Diagnosis['code']> => {
    if (!param || param.some(c => !isDiagnosisCode(c))) {
        throw new Error('not all codes are valid');
    }
    return param.map(c => parseString('code', c));
};

const isDiagnosisCode = (text: unknown): text is string => {
    const diagnosisCodes = getDiagnoses().map(d => d.code);
    if (!text || !Object.values(diagnosisCodes).includes(parseString('code', text))) {
        throw new Error('code is not valid: ' + text);
    }

    return true;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseString = (field: string, text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error(`incorrect or missing ${field}`);
    }

    return text;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseHealthRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error('incorrect rating' + rating);
    }
    return rating;
};

const parseHealthCheckEntry = (type: unknown): EntryType.HealthCheck => {
    if (!type || type !== EntryType.HealthCheck) {
        throw new Error('incorrect type' + type);
    }
    return type;
};

const parseHospitalEntry = (type: unknown): EntryType.Hospital => {
    if (!type || type !== EntryType.Hospital) {
        throw new Error('incorrect type' + type);
    }
    return type;
};

const parseOccupationalEntry = (type: unknown): EntryType.OccupationalHealthcare => {
    if (!type || type !== EntryType.OccupationalHealthcare) {
        throw new Error('incorrect type' + type);
    }
    return type;
};

type PatientFields = { name: unknown; ssn: unknown; dateOfBirth: unknown; occupation: unknown; gender: unknown };
interface BaseEntryFields {
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown[];
}
interface HealthCheckEntryFields extends BaseEntryFields {
    type: unknown;
    healthCheckRating: unknown;
}

interface HospitalEntryFields extends BaseEntryFields {
    type: unknown;
    discharge?: {
        date?: unknown;
        criteria?: unknown;
    };
}
interface OccupationalHealthcareEntryFields extends BaseEntryFields {
    type: unknown;
    employerName: unknown;
    sickLeave?: {
        startDate?: unknown;
        endDate?: unknown;
    };
}

export const toDiagnosis = (code: string): Diagnosis | undefined => {
    const diagnosis = getDiagnoses().find(d => d.code === code);
    return diagnosis ? diagnosis : undefined;
};

export const toNewPatient = ({ name, ssn, dateOfBirth, occupation, gender }: PatientFields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString('name', name),
        ssn: parseString('social security number', ssn),
        dateOfBirth: parseString('date of birth', dateOfBirth),
        occupation: parseString('occupation', occupation),
        gender: parseGender(gender),
    };

    return newPatient;
};

export const toHealthCheckEntry = ({
    type,
    description,
    date,
    specialist,
    healthCheckRating,
}: HealthCheckEntryFields): NewEntry => {
    const newEntry = {
        ...toBaseEntry({ description, date, specialist }),
        type: parseHealthCheckEntry(type),
        healthCheckRating: parseHealthRating(healthCheckRating),
    };
    return newEntry;
};

export const toHospitalEntry = ({
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
    discharge,
}: HospitalEntryFields): NewEntry => {
    const newEntry = {
        ...toBaseEntry({ description, date, specialist, diagnosisCodes }),
        type: parseHospitalEntry(type),
        discharge:  {
            date: discharge?.date ? parseString('date', discharge?.date) : undefined,
            criteria: discharge?.criteria ? parseString('criteria', discharge?.criteria) : undefined,
        },
    };
    return newEntry;
};

export const toOccupationalHealthcareEntry = ({
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
    employerName,
    sickLeave
}: OccupationalHealthcareEntryFields): NewEntry => {
    const newEntry = {
        ...toBaseEntry({ description, date, specialist, diagnosisCodes }),
        type: parseOccupationalEntry(type),
        employerName: parseString('employer', employerName),
        sickLeave: {
            startDate: parseString('start date', sickLeave?.startDate),
            endDate: parseString('end date', sickLeave?.endDate),
        },
    };
    return newEntry;
};

const toBaseEntry = ({ description, date, diagnosisCodes, specialist }: BaseEntryFields): NewBaseEntry => {
    return {
        description: parseString('description', description),
        date: parseString('date', date),
        specialist: parseString('specialist', specialist),
        diagnosisCodes: diagnosisCodes ? parseDiagnoses(diagnosisCodes) : undefined,
    };
};
